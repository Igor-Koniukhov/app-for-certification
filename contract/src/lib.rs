extern crate time;

use std::borrow::Borrow;
use std::fmt::format;

use near_sdk::{AccountId, env, log, near_bindgen, setup_alloc};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};

use crate::source::Section;
use crate::source::source;

mod source;

setup_alloc!();

// Structs in Rust are similar to other languages, and may include impl keyword as shown below
// Note: the names of the structs are not important when calling the smart contract, but the function names are
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    id_answers: UnorderedMap<String, Vec<String>>,
    tickets: UnorderedMap<String, Vec<Section>>,
    answers: UnorderedMap<String, Answer>,
    result: UnorderedMap<String, Result>,
    user_collection_answers: UnorderedMap<String, Vec<Answer>>,
    attempt: UnorderedMap<String, u8>,
}

const VALID_RESULT: f32 = 70 as f32;


impl Default for Contract {
    fn default() -> Self {
        Self {
            id_answers: UnorderedMap::<String, Vec<String>>::new(b"s"),
            tickets: UnorderedMap::<String, Vec<Section>>::new(b"t"),
            answers: UnorderedMap::<String, Answer>::new(b"a"),
            result: UnorderedMap::<String, Result>::new(b"r"),
            user_collection_answers: UnorderedMap::<String, Vec<Answer>>::new(b"a"),
            attempt: UnorderedMap::<String, u8>::new(b"i"),
        }
    }
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
    pub fn get_tickets(&self, account_id: String) -> Option<Vec<Section>> {
        self.tickets.get(&account_id)
    }

    pub fn set_tickets(&mut self, account_id: String) -> String {
        let sections = source();
        let mut array_of_sections: Vec<Section> = vec![];
        let mut array_of_id: Vec<String> = vec![];

        for section in sections {
            array_of_sections.push(section);
        };
        self.tickets.insert(&account_id, &array_of_sections);

        let sections = self.tickets.get(&account_id).unwrap();
        let attempt = self.get_num(&account_id);
        for tickets in sections {
            for ticket in tickets.tickets {
                array_of_id.push(format!("{}{}{}{}", account_id, ticket.article_id, ticket.id, attempt))
            }
        }

        let mut existing_array = self.get_existing_array(&account_id);
        existing_array.append(&mut array_of_id);
        self.id_answers.insert(&account_id, &existing_array);
        String::from("Tickets is set up")
    }

    pub fn get_existing_array(&mut self, account_id: &AccountId) -> Vec<String> {
        match self.id_answers.get(&account_id) {
            Some(array) => array,
            None => vec![],
        }
    }
    pub fn get_id_answers(&self, account_id: String) -> Option<Vec<String>> {
        self.id_answers.get(&account_id)
    }

    pub fn set_answer(
        &mut self,
        id: u8,
        article_id: u8,
        your_answer: String,
        correct_answer: String,
        pass: bool,
        account_id: String,
    ) {
        let answer: Answer = Answer {
            id,
            article_id,
            your_answer,
            correct_answer,
            pass,
        };
        let attempt = self.get_num(&account_id);
        let key = format!("{}{}{}{}", &account_id, &answer.article_id, &answer.id, &attempt);
        self.answers.insert(&key, &answer);
    }

    pub fn set_user_collection_answers(&mut self, account_id: String) -> String {
        let array_answer_id = self.id_answers.get(&account_id).unwrap();
        let mut existing_collection_asnswers = self.get_existing_collection_answers(&account_id);

        self.answers.iter().enumerate().for_each(|(i, answer)| {
            array_answer_id.iter().enumerate().for_each(|(_, id)| {
                if *id == answer.0 {
                    existing_collection_asnswers.push(answer.1.clone())
                }
            })
        });

        self.user_collection_answers.insert(&account_id, &existing_collection_asnswers);
        format!("{:?}", existing_collection_asnswers)
    }

    pub fn get_existing_collection_answers(&mut self, account_id: &AccountId) -> Vec<Answer> {
        match self.user_collection_answers.get(&account_id) {
            Some(array) => array,
            None => vec![],
        }
    }

    pub fn get_user_collection_answers(self, account_id: String) -> Option<Vec<Answer>> {
        self.user_collection_answers.get(&account_id)
    }

    pub fn set_current_result(
        &mut self,
        account_id: String,
        answers: Vec<Answer>,
    ) {
        let current_attempt = self.get_num(&account_id).clone();
        let attempt = current_attempt + 1;
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
            attempt,
            answers,
            number_of_questions: sum_answers,
            number_of_correct_answers: num_correct.len() as u8,
            number_of_incorrect_answers: num_in_correct.len() as u8,
            score,
            is_valid: score >= VALID_RESULT as f32,
        };
        self.result.insert(&account_id, &result);

    }

    pub fn get_current_result(&self, account_id: &String) -> Result {
        match self.result.get(&account_id) {
            Some(result) => result,
            None => Result {
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

    pub fn get_answers(&self) -> Vec<(String, Answer)> {
        self.answers.to_vec()
    }

    pub fn get_num(&self, account_id: &String) -> u8 {
        match self.attempt.get(&account_id) {
            Some(attempt) => attempt,
            None => 0,
        }
    }

    pub fn increment(&mut self, account_id: String) -> Response {
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
