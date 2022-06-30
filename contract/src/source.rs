use serde_derive::Serialize;




#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Debug, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Ticket {
    pub id: u8,
    pub article_id: u8,
    pub question: String,
    pub options: [String; 4],
    pub correct_answer: String,
    pub is_correct: bool,
    pub started: String,
    pub finished: String
}



#[near_bindgen]
#[derive(Serialize)]
pub struct Sections {
    pub article: u8,
    pub tickets: Vec<Ticket>,
}


impl Sections {
    pub fn return_article() -> Self {
        let section = Self {
            article: 1,
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 1,
                    question: "somequestion1".to_string(),
                    options: ["a".to_string(), "b".to_string(), "c".to_string(), "d".to_string()],
                    correct_answer: "".to_string(),
                    is_correct: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket{
                    id: 2,
                    article_id: 1,
                    question: "somequestion2".to_string(),
                    options: ["a".to_string(), "b".to_string(), "c".to_string(), "d".to_string()],
                    correct_answer: "".to_string(),
                    is_correct: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket{
                    id: 2,
                    article_id: 1,
                    question: "somequestion3".to_string(),
                    options: ["a".to_string(), "b".to_string(), "c".to_string(), "d".to_string()],
                    correct_answer: "".to_string(),
                    is_correct: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                }

            ],
        };
        section
    }
}
