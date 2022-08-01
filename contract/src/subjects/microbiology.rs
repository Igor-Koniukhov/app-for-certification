mod subjects_struct;

use crate::subjects_struct::{Section, Ticket};

pub fn microbiology() -> Vec<Section> {
   vec![
        Section {
            article: 1,
            title: "1".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 1,
                    question: "What is the normality of a solution of sodium hydroxide(molecular weight=40) containing 20 grams in 100 mL of solution?".to_string(),
                    options: Vec::from(
                        [
                            "5.0N".to_string(),
                            "1.0N".to_string(),
                            "0.5N".to_string(),
                            "0.4N".to_string()
                        ]),
                    correct_answer: "0.4N".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 1,
                    question: "Carbohydrates are organic compounds of 1. carbon 2. hydrogen 33. oxygen".to_string(),
                    options: Vec::from(
                        ["1 and 2 only".to_string(),
                            "1 and 3 only".to_string(),
                            "2 and 3 only".to_string(),
                            "1, 2 and 3 only".to_string()]),
                    correct_answer: "1 and 2 only".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 1,
                    question: "If test results are within +/-2 standard deviations, the ratio of test results beyond the +/-2 SD limit will be 1 out of".to_string(),
                    options: Vec::from(
                        ["3".to_string(),
                            "5".to_string(),
                            "20".to_string(),
                            "300".to_string()]),
                    correct_answer: "5".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                }],
        },
        Section {
            article: 2,
            title: "2".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 2,
                    question: "What is the normality of a solution of sodium hydroxide(molecular weight=40) containing 20 grams in 100 mL of solution?".to_string(),
                    options: Vec::from(
                        ["5.0N".to_string(),
                            "1.0N".to_string(),
                            "0.5N".to_string(),
                            "0.4N".to_string()]),
                    correct_answer: "0.4N".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 2,
                    question: "Carbohydrates are organic compounds of 1. carbon 2. hydrogen 33. oxygen".to_string(),
                    options: Vec::from(
                        ["1 and 2 only".to_string(),
                            "1 and 3 only".to_string(),
                            "2 and 3 only".to_string(),
                            "1, 2 and 3 only".to_string()]),
                    correct_answer: "1 and 2 only".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 2,
                    question: "If test results are within +/-2 standard deviations, the ratio of test results beyond the +/-2 SD limit will be 1 out of".to_string(),
                    options: Vec::from(
                        ["3".to_string(),
                            "5".to_string(),
                            "20".to_string(),
                            "300".to_string()]),
                    correct_answer: "5".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
        Section {
            article: 3,
            title: "3".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 3,
                    question: "What is the normality of a solution of sodium hydroxide(molecular weight=40) containing 20 grams in 100 mL of solution?".to_string(),
                    options: Vec::from(
                        ["5.0N".to_string(),
                            "1.0N".to_string(),
                            "0.5N".to_string(),
                            "0.4N".to_string()]),
                    correct_answer: "0.4N".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 3,
                    question: "Carbohydrates are organic compounds of 1. carbon 2. hydrogen 33. oxygen".to_string(),
                    options: Vec::from(
                        ["1 and 2 only".to_string(),
                            "1 and 3 only".to_string(),
                            "2 and 3 only".to_string(),
                            "1, 2 and 3 only".to_string()]),
                    correct_answer: "1 and 2 only".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 3,
                    question: "If test results are within +/-2 standard deviations, the ratio of test results beyond the +/-2 SD limit will be 1 out of".to_string(),
                    options: Vec::from(
                        ["3".to_string(),
                            "5".to_string(),
                            "20".to_string(),
                            "300".to_string()]),
                    correct_answer: "5".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 4,
                    article_id: 3,
                    question: "If test results are within +/-2 standard deviations, the ratio of test results beyond the +/-2 SD limit will be 1 out of".to_string(),
                    options: Vec::from(
                        ["3".to_string(),
                            "5".to_string(),
                            "20".to_string(),
                            "300".to_string()]),
                    correct_answer: "5".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
    ]

}


