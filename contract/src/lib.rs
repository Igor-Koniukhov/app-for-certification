use near_sdk::{env, near_bindgen, setup_alloc};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};
//use serde_json::Value::String;



use crate::source::Section;
use crate::source::source;

mod source;

setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    records: LookupMap<String, String>,
    tickets: UnorderedMap<String, Vec<Section>>,
    answers: UnorderedMap<String, Vec<Answer>>,
    current_result: UnorderedMap<String, Result>,
}

const VALID_RESULT: u32 = 80;

impl Default for Contract {
    fn default() -> Self {
        Self {
            records: LookupMap::new(b"s".to_vec()),
            tickets: UnorderedMap::<String, Vec<Section>>::new(b"t"),
            answers: UnorderedMap::<String, Vec<Answer>>::new(b"a"),
            current_result: UnorderedMap::<String, Result>::new(b"c"),
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct AnswerInfo {
    pub id: u8,
    pub article_id: u8,
    pub your_answer: String,
    pub correct_answer: String,
    pub pass: bool,
    pub finished: String,
}
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Answer{
    pub id: u8,
    pub answer: AnswerInfo
}



#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Result {
    pub number_of_questions: usize,
    pub number_of_answers: u8,
    pub number_of_correct_answers: u8,
    pub is_valid: bool,
}

pub struct Certificate {
    pub id: u8,
    pub examine_id: u8,
    pub current_attempt: u8,
    pub is_valid: bool,
    pub result: UnorderedMap<String, Result>,
}


#[near_bindgen]
impl Contract {
    pub fn get_tickets(&self) -> Option<Vec<Section>> {
        let account_id = env::signer_account_id();
        self.tickets.get(&account_id)
    }
    pub fn get_all_tickets(&self) -> Vec<(String, Vec<Section>)> {
        self.tickets.to_vec()
    }

    pub fn set_tickets(&mut self) -> String {
        let sections = source();
        let account_id = env::signer_account_id();
        let mut array_of_sections: Vec<Section> = vec![];
        let key = format!("{}", account_id);
        let mut result: Result = Result {
            number_of_questions: 0,
            number_of_answers: 0,
            number_of_correct_answers: 0,
            is_valid: false,
        };
        for section in sections {
            env::log(format!("ticket '{:?}' ", section).as_bytes());
            result.number_of_questions += section.tickets.len();
            array_of_sections.push(section);
        };
        self.current_result.insert(&key, &result);

        self.tickets.insert(&key, &array_of_sections);
        String::from("Tickets is set up")
    }

    pub fn set_answer(
        &mut self,
        id: u8,
        article_id: u8,
        your_answer: String,
        correct_answer: String,
        pass: bool,
    ) {
        let mut answers: Vec<Answer> = vec![];
        let mut key = format!("{}{}", &article_id, &id);
        let answer: Answer=Answer{
            id: key.parse().unwrap(),
            answer: AnswerInfo {
                id,
                article_id,
                your_answer,
                correct_answer,
                pass,
                finished: env::block_timestamp().to_string(),
            }
        };

        let account_id = env::signer_account_id();
        env::log(format!("answers '{:?}' for account '{}'", answer, account_id, ).as_bytes());
        answers.push(answer);


        self.answers.insert(&account_id, &answers);



    }
    pub fn set_current_result(
        &mut self,
        your_answer: String,
        correct_answer: String,
    ) {
        let account_id = env::signer_account_id();
        let mut result: Result = self.current_result.get(&account_id).unwrap();
        result.number_of_answers += 1;
        let is_coincide: bool = your_answer == correct_answer;
        env::log(format!("is coincide '{:?}' ", is_coincide).as_bytes());


        if is_coincide {
            result.number_of_correct_answers += 1;
        }
        env::log(format!("result '{:?}' ", result).as_bytes());
    }
    pub fn get_current_result(&self, account_id: String) -> Result {
        match self.current_result.get(&account_id) {
            Some(result) => result,
            None => Result {
                number_of_questions: 0,
                number_of_answers: 0,
                number_of_correct_answers: 0,
                is_valid: false,
            },
        }
    }

    pub fn get_answers(&self) -> Option<Vec<Answer>> {
        let account_id = env::signer_account_id();
        self.answers.get(&account_id)
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
}
