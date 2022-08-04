#[allow(unused_imports)]
extern crate time;

use std::collections::HashMap;

use near_sdk::{
    AccountId,
    Balance,
    CryptoHash,
    env,
    log,
    near_bindgen,
    PanicOnDefault,
    Promise,
    PromiseOrValue,
};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{
    LazyOption,
    LookupMap,
    UnorderedMap,
    UnorderedSet,
};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};

pub use crate::approval::*;
use crate::chemistry::chemistry;
use crate::chemistry::Section;
pub use crate::events::*;
use crate::internal::*;
pub use crate::metadata::*;
use crate::microbiology::microbiology;
pub use crate::mint::*;
pub use crate::nft_core::*;
use crate::physic::physic;
pub use crate::royalty::*;
use crate::sociology::sociology;

mod internal;
mod approval;
mod enumeration;
mod metadata;
mod mint;
mod nft_core;
mod royalty;
mod events;

#[path = "subjects/chemistry.rs"]
mod chemistry;
#[path = "subjects/physic.rs"]
mod physic;
#[path = "subjects/sociology.rs"]
mod sociology;
#[path = "subjects/microbiology.rs"]
mod microbiology;
#[path = "subjects/subjects_struct.rs"]
mod subjects_struct;

// for validation attempt of exam
const VALID_RESULT: f32 = 70 as f32;
/// This spec can be treated like a version of the standard.
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub is_init: bool,

    //contract owner
    pub owner_id: AccountId,

    //keeps track of the id_attempts vec for a given account ID
    pub id_attempts: UnorderedMap<AccountId, Vec<String>>,

    //keeps track of the tickets vec for a given individual key
    subjects: UnorderedMap<String, Vec<Section>>,

    //keeps track of the answers vec for a given individual key
    pub answers: UnorderedMap<String, Vec<Answer>>,

    //keeps track of the answers_id for a given attempt_key
    pub key_answers_id: LookupMap<String, UnorderedSet<String>>,

    //keeps track of the result struct for a given account ID
    pub results: UnorderedMap<AccountId, Result>,

    //keeps track of the numbers attempts for a given account ID
    pub attempt: UnorderedMap<AccountId, u8>,

    //keeps track of all the token IDs for a given account
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

    //keeps track of the token struct for a given token ID
    pub tokens_by_id: LookupMap<TokenId, Token>,

    //keeps track of the token metadata for a given token ID
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,

    //keeps track of the metadata for the contract
    pub metadata: LazyOption<NFTContractMetadata>,

}

/// Helper structure for keys of the persistent collections.
#[derive(BorshSerialize)]
pub enum StorageKey {
    TokensPerOwner,
    TokenPerOwnerInner { account_id_hash: CryptoHash },
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,
    TokensPerType,
    TokensPerTypeInner { token_type_hash: CryptoHash },
    TokenTypesLocked,
    IdAttempts,
    Subject,
    Answers,
    KeyForResult { answer_id_hash: CryptoHash },
    Results,
    Attempt,
}


#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Answer {
    pub id: u8,
    pub article_id: u8,
    pub your_answer: String,
    pub correct_answer: String,
    pub pass: bool,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Response {
    pub ok: bool,
    pub message: String,
    pub attempt: u8,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Result {
    pub subject_name: String,
    pub attempt: u8,
    pub attempt_id: String,
    pub number_of_questions: u8,
    pub number_of_correct_answers: u8,
    pub number_of_incorrect_answers: u8,
    pub score: f32,
    pub is_valid: bool,
}

#[near_bindgen]
impl Contract {
    //initialization of the contract can only be called once.
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: "nft-1.0.0".to_string(),
                name: "NFT Contract For Certification".to_string(),
                symbol: "CERTIFICATOR".to_string(),
                icon: None,
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        Self {
            is_init: true,
            owner_id,
            id_attempts: UnorderedMap::<AccountId, Vec<String>>::new(StorageKey::IdAttempts.try_to_vec().unwrap()),
            subjects: UnorderedMap::<String, Vec<Section>>::new(StorageKey::Subject.try_to_vec().unwrap()),
            answers: UnorderedMap::<String, Vec<Answer>>::new(StorageKey::Answers.try_to_vec().unwrap()),
            key_answers_id: LookupMap::new(StorageKey::KeyForResult {answer_id_hash: CryptoHash::default()}.try_to_vec().unwrap()),
            results: UnorderedMap::<AccountId, Result>::new(StorageKey::Results.try_to_vec().unwrap()),
            attempt: UnorderedMap::<AccountId, u8>::new(StorageKey::Attempt.try_to_vec().unwrap()),

            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
            tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
            token_metadata_by_id: UnorderedMap::new(StorageKey::TokenMetadataById.try_to_vec().unwrap()),

            metadata: LazyOption::new(StorageKey::NFTContractMetadata.try_to_vec().unwrap(),
                                      Some(&metadata),
            ),
        }
    }

    pub fn set_subjects(&mut self) -> Response {
        let chemistry = chemistry();
        let physic = physic();
        let sociology = sociology();
        let microbiology = microbiology();

        self.set_tickets(String::from("chemistry"), chemistry);
        self.set_tickets(String::from("physic"), physic);
        self.set_tickets(String::from("sociology"), sociology);
        self.set_tickets(String::from("microbiology"), microbiology);

        Response {
            ok: true,
            message: "Subjects is set up".to_string(),
            attempt: 0,
        }
    }

    //set_tickets - set tickets from source when exam is started
    pub fn set_tickets(
        &mut self,
        key_subject: String,
        sections: Vec<Section>,
    ) -> String {
        let mut array_of_sections: Vec<Section> = vec![];

        for section in sections {
            array_of_sections.push(section);
        };
        self.subjects.insert(&key_subject, &array_of_sections);

        String::from("Tickets set up")
    }

    pub fn set_answer(
        &mut self,
        subject_name: String,
        attempt: u8,
        article: u8,
        answers: Vec<Answer>,
        account_id: AccountId,
    ) -> String {
        let answer_id = format!("{}{}-{}-{}", attempt, article, subject_name, account_id);
        let attempt_id = format!("{}-{}-{}", attempt, subject_name, account_id);

        /*self.add_key_answer_to_owner_attempt(attempt_id, answer_id.clone());*/
        let mut answers_id_set = self.key_answers_id.get(&attempt_id).unwrap_or_else(|| {
            //if the account doesn't have any answers_id, we create a new unordered set
            UnorderedSet::new(
                StorageKey::KeyForResult {
                    //we get a new unique prefix for the collection
                    answer_id_hash: hash_answer_id(answer_id.clone()),
                }
                    .try_to_vec()
                    .unwrap(),
            )
        });

        //we insert the answer ID into the set
        answers_id_set.insert(&answer_id);

        //we insert that set for the given account ID.
        self.key_answers_id.insert(&attempt_id, &answers_id_set);
        self.answers.insert(&answer_id, &answers);

        String::from("Answers set up")
    }


    pub fn set_current_result(
        &mut self,
        account_id: AccountId,
        subject_name: String,
        answers: Vec<Answer>,
        attempt: u8,
    ) -> Response {
        let mut num_correct: Vec<bool> = vec![];
        let mut num_incorrect: Vec<bool> = vec![];

        let attempt_id = format!("{}-{}-{}", attempt, subject_name, account_id);


        for answer in &answers {
            if answer.pass == true {
                num_correct.push(answer.pass);
            } else {
                num_incorrect.push(answer.pass);
            }
        }
        let score: f32 = (num_correct.len() * 100 / (num_correct.len() + num_incorrect.len())) as f32;
        let sum_answers: u8 = (num_correct.len() + num_incorrect.len()) as u8;
        let result: Result = Result {
            subject_name,
            attempt,
            attempt_id,
            number_of_questions: sum_answers,
            number_of_correct_answers: num_correct.len() as u8,
            number_of_incorrect_answers: num_incorrect.len() as u8,
            score,
            is_valid: score >= VALID_RESULT as f32,
        };
        self.results.insert(&account_id, &result);
        Response {
            ok: true,
            message: "Result is set".to_string(),
            attempt,
        }
    }

    pub fn increment(&mut self, account_id: AccountId) -> Response {
        let current_attempt = self.get_num(&account_id).clone();
        let attempt = current_attempt + 1;

        if current_attempt == 3 {
            return Response {
                ok: false,
                message: String::from("You have 3 attempt already! "),
                attempt: current_attempt,
            };
        }
        self.attempt.insert(&account_id, &attempt);
        log!("Attempt {}", attempt);
        Response {
            ok: true,
            message: String::from("Success! "),
            attempt,
        }
    }

    pub fn reset(&mut self, account_id: AccountId) {
        self.attempt.remove(&account_id);
        log!("Reset attempt");
    }

    pub fn get_token_metadata(&self, account_id: AccountId) -> Vec<TokenMetadata> {
        let mut tokens: Vec<TokenMetadata> = vec![];
        match self.tokens_per_owner.get(&account_id) {
            None => {}
            Some(tokens_id_collection) =>
                for id in tokens_id_collection.to_vec() {
                    match self.token_metadata_by_id.get(&id) {
                        None => {}
                        Some(token) => tokens.push(token)
                    }
                }
        }
        tokens
    }

    pub fn get_tickets_by_subject_name(&self, name: &String) -> Vec<Section> {
        match self.subjects.get(&name) {
            Some(tickets) => tickets,
            None => vec![]
        }
    }

    pub fn get_current_result(&self, account_id: &AccountId) -> Result {
        match self.results.get(&account_id) {
            Some(result) => result,
            None => Result {
                subject_name: String::from(""),
                attempt: 0,
                attempt_id: String::from(""),
                number_of_questions: 0,
                number_of_incorrect_answers: 0,
                number_of_correct_answers: 0,
                score: 0.00,
                is_valid: false,
            },
        }
    }

    pub fn get_answers_by_attempt_id(&self, attempt_id: String)->Vec<Vec<Answer>>{
        let mut answers_id_by_attempt: Vec<Vec<Answer>> = vec![];
        match self.key_answers_id.get(&attempt_id) {
            None => {}
            Some(answers_id_collection) =>
                for id in answers_id_collection.to_vec() {
                    match self.answers.get(&id) {
                        None => {}
                        Some(answers) => answers_id_by_attempt.push(answers)
                    }
                }
        }
        answers_id_by_attempt
    }

    pub fn get_answers_by_key(&self, key: &String) -> Vec<Answer> {
        match self.answers.get(&key) {
            Some(answer_array) => answer_array,
            None => vec![]
        }
    }

    pub fn get_answers(&self) -> Vec<(String, Vec<Answer>)> {
        self.answers.to_vec()
    }
    pub fn get_id_attempts(&self, account_id: &AccountId) -> Vec<String> {
        match self.id_attempts.get(&account_id) {
            Some(key_array) => key_array,
            None => vec![]
        }
    }

    pub fn get_num(&self, account_id: &AccountId) -> u8 {
        match self.attempt.get(&account_id) {
            Some(attempt) => attempt,
            None => 0,
        }
    }

    pub fn get_status_init(&self) -> bool {
        self.is_init
    }

    pub fn get_subjects(&self) -> Vec<(String, Vec<Section>)> {
        self.subjects.to_vec()
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 *
 * To run from contract directory:
 * cargo test -- --nocapture
 *
 * From project root, to run in combination with frontend tests:
 * yarn test
 *
 */
#[cfg(test)]
mod tests {
    use near_sdk::{Gas, ONE_NEAR, test_utils::*, testing_env};

    use crate::*;

    fn account_id() -> AccountId {
        "certificator.testnet".parse::<AccountId>().expect("Can't get AccountID")
    }

    fn owner_id() -> AccountId {
        "owner.testnet".parse::<AccountId>().unwrap()
    }

    fn metadata() -> TokenMetadata {
        TokenMetadata {
            title: Option::from(String::from("Token title")),
            description: Option::from(String::from("Some test description")),
            media: None,
            media_hash: None,
            copies: None,
            issued_at: None,
            expires_at: None,
            starts_at: None,
            updated_at: None,
            extra: None,
            reference: None,
            reference_hash: None,
        }
    }

    fn answers() -> Vec<Answer> {
        vec![
            Answer {
                id: 1,
                article_id: 2,
                your_answer: "yes".to_string(),
                correct_answer: "no".to_string(),
                pass: true,
            },
            Answer {
                id: 2,
                article_id: 1,
                your_answer: "yes".to_string(),
                correct_answer: "yes".to_string(),
                pass: true,
            },
            Answer {
                id: 3,
                article_id: 1,
                your_answer: "yes".to_string(),
                correct_answer: "no".to_string(),
                pass: true,
            },
        ]
    }


    fn get_context(signer: &AccountId, deposit: Option<u128>) -> VMContextBuilder {
        let mut contex = VMContextBuilder::new();
        contex
            .current_account_id(account_id())
            .account_balance(100 * ONE_NEAR)
            .signer_account_id(signer.clone())
            .attached_deposit(deposit.unwrap_or(0))
            .prepaid_gas(Gas(30_000_000_000_000))
            .is_view(false);
        contex
    }

    #[test]
    fn get_status_init() {
        let context = get_context(&owner_id(), None);
        testing_env!(context.build());
        let contract = Contract::new_default_meta(owner_id());
        let status = contract.get_status_init();
        assert_eq!(status, true)
    }

    #[test]
    fn set_subjects() {
        let context = get_context(&owner_id(), None);
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(owner_id());
        let chemistry = chemistry();
        contract.set_subjects();

        assert_eq!(
            contract.get_tickets_by_subject_name(&String::from("chemistry")).len(),
            chemistry.len()
        );
    }

    #[test]
    fn set_tickets() {
        let context = get_context(&owner_id(), None);
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(owner_id());
        let chemistry = chemistry();
        contract.set_tickets(String::from("chemistry"), chemistry.clone());
        let result = contract.get_tickets_by_subject_name(&String::from("chemistry"));

        assert_eq!(result.len(),
                   chemistry.len());
    }

    #[test]
    fn set_answer() {
        let context = get_context(&owner_id(), None);
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(owner_id());

        let attempt = 0;
        let article = 1;
        let subject_name = String::from("chemistry");
        let key_attempt = format!("{}{}-{}-{}", attempt, article, subject_name, &owner_id());

        contract.answers.insert(&key_attempt, &answers());
        println!("answers {:?}", contract.get_answers_by_key(&key_attempt).len());
        assert_eq!(
            contract.get_answers_by_key(&key_attempt).len(),
            answers().len()
        );
    }

    #[test]
    fn set_current_result() {
        let context = get_context(&owner_id(), None);
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(owner_id());
        let name = String::from("chemistry");

        contract.set_current_result(owner_id(), name, answers(), 0);

        assert_eq!(
            contract.get_current_result(&owner_id()).score,
            100
        );
    }

    #[test]
    fn increment() {
        let mut contract = Contract::new_default_meta(owner_id());
        contract.increment(owner_id());
        assert_eq!(1, contract.get_num(&owner_id()));
    }

    #[test]
    fn increment_and_reset() {
        let mut contract = Contract::new_default_meta(owner_id());
        contract.increment(owner_id());
        contract.reset(owner_id());
        assert_eq!(0, contract.get_num(&owner_id()));
    }

    #[test]
    fn nft_mint() {
        let context = get_context(&owner_id(), Some(ONE_NEAR));
        testing_env!(context.build());
        let contract = Contract::new_default_meta(owner_id());
        let token_id: TokenId = TokenId::from("101-test-id");
        let mut contract = Contract::new_default_meta(owner_id());

        let mut royalty = HashMap::<AccountId, u32>::new();

        royalty.insert(owner_id(), ONE_NEAR as u32);

        contract.nft_mint(
            token_id.clone(),
            metadata(),
            owner_id(),
            Some(royalty.clone()),
        );
        match contract.token_metadata_by_id.get(&token_id) {
            None => {}
            Some(meta) => assert_eq!(meta, metadata())
        };
    }

    #[test]
    fn get_token_metadata() {
        let context = get_context(&owner_id(), Some(ONE_NEAR));
        testing_env!(context.build());
        let mut contract = Contract::new_default_meta(owner_id());
        let token_id: TokenId = TokenId::from("101-test-id");
        let mut contract = Contract::new_default_meta(owner_id());

        let mut royalty = HashMap::<AccountId, u32>::new();

        royalty.insert(owner_id(), ONE_NEAR as u32);

        contract.nft_mint(
            token_id.clone(),
            metadata(),
            owner_id(),
            Some(royalty.clone()),
        );
        let meta_array = contract.get_token_metadata(owner_id());
        assert_eq!(meta_array, vec![metadata()])
    }
}
