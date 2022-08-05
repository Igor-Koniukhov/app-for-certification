use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::Deserialize;
use near_sdk::serde::Serialize;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Ticket {
    pub id: u8,
    pub article_id: u8,
    pub question: String,
    pub options: Vec<String>,
    pub correct_answer: String,
    pub pass: bool,
    pub started: String,
    pub finished: String,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Debug, Clone, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Section {
    pub article: u8,
    pub title: String,
    pub tickets: Vec<Ticket>,
}
