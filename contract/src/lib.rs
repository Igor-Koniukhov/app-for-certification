extern crate time;

use std::collections::HashMap;
use std::ops::Index;

use itertools::Itertools;
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
    tickets: UnorderedMap<String, Vec<Section>>,

    //keeps track of the answers vec for a given individual key
    pub answers: UnorderedMap<String, Vec<Answer>>,

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
    Tickets,
    Answers,
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
    pub answers: Vec<Answer>,
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
            tickets: UnorderedMap::<String, Vec<Section>>::new(StorageKey::Tickets.try_to_vec().unwrap()),
            answers: UnorderedMap::<String, Vec<Answer>>::new(StorageKey::Answers.try_to_vec().unwrap()),
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
        self.tickets.insert(&key_subject, &array_of_sections);

        String::from("Tickets is set up")
    }

    pub fn set_answer(
        &mut self,
        subject_name: String,
        attempt: u8,
        article: u8,
        answers: Vec<Answer>,
        account_id: AccountId,
    ) {
        let key_attempt = format!("{}{}-{}-{}", attempt, article, subject_name, account_id);

        self.answers.insert(&key_attempt, &answers);
    }


    pub fn set_current_result(
        &mut self,
        account_id: AccountId,
        subject_name: String,
        answers: Vec<Answer>,
        attempt: u8,
    ) -> Response {
        env::log(format!("attempt from set_current_result {}", attempt).as_bytes());
        let mut num_correct: Vec<bool> = vec![];
        let mut num_in_correct: Vec<bool> = vec![];
        for answer in &answers {
            if answer.pass == true {
                num_correct.push(answer.pass);
            } else {
                num_in_correct.push(answer.pass);
            }
        }
        let score: f32 = (num_correct.len() * 100 / (num_correct.len() + num_in_correct.len())) as f32;
        let sum_answers: u8 = (num_correct.len() + num_in_correct.len()) as u8;
        let result: Result = Result {
            subject_name,
            attempt,
            answers,
            number_of_questions: sum_answers,
            number_of_correct_answers: num_correct.len() as u8,
            number_of_incorrect_answers: num_in_correct.len() as u8,
            score,
            is_valid: score >= VALID_RESULT as f32,
        };
        self.results.insert(&account_id, &result);
        let response: Response = Response {
            ok: true,
            message: "Result is set".to_string(),
            attempt,
        };
        response
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

    pub fn reset(&mut self) {
        let account_id = env::signer_account_id();
        self.attempt.remove(&account_id);
        log!("Reset attempt");
    }


    pub fn get_tickets(&self, key_subject: String) -> Vec<Section> {
        self.tickets.get(&key_subject).unwrap()
    }

    pub fn get_token_metadate(&self) -> Vec<(TokenId, TokenMetadata)> {
        self.token_metadata_by_id.to_vec()
    }

    pub fn get_tickets_by_subject_name(&self, name: &String) -> Vec<Section> {
        match self.tickets.get(&name) {
            Some(tickets) => tickets,
            None => vec![]
        }
    }

    pub fn get_current_result(&self, account_id: AccountId) -> Result {
        match self.results.get(&account_id) {
            Some(result) => result,
            None => Result {
                subject_name: String::from(""),
                attempt: 0,
                answers: vec![],
                number_of_questions: 0,
                number_of_incorrect_answers: 0,
                number_of_correct_answers: 0,
                score: 0.00,
                is_valid: false,
            },
        }
    }

    pub fn get_answers_by_key(&self, key: &String) -> Vec<Answer> {
        match self.answers.get(&key) {
            Some(answerArray) => answerArray,
            None => vec![]
        }
    }
    pub fn get_answers(&self) -> Vec<(String, Vec<Answer>)> {
        self.answers.to_vec()
    }
    pub fn get_id_attempts(&self, accaunt_id: &AccountId) -> Vec<String> {
        match self.id_attempts.get(&accaunt_id) {
            Some(keyArray) => keyArray,
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
    use near_sdk::{testing_env, VMContext};
    use near_sdk::MockedBlockchain;

    use super::*;

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn set_then_get_greeting() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Welcome::default();
        contract.set_greeting("howdy".to_string());
        assert_eq!(
            "howdy".to_string(),
            contract.get_greeting("bob_near".to_string())
        );
    }

    #[test]
    fn get_default_greeting() {
        let context = get_context(vec![], true);
        testing_env!(context);
        let contract = Welcome::default();
        // this test did not call set_greeting so should return the default "Hello" greeting
        assert_eq!(
            "Hello".to_string(),
            contract.get_greeting("francis.near".to_string())
        );
    }

    #[test]
    fn increment() {
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter { val: 0 };
        contract.increment();
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn increment_and_reset() {
        let mut contract = Counter { val: 0 };
        contract.increment();
        contract.reset();
        assert_eq!(0, contract.get_num());
    }
}
