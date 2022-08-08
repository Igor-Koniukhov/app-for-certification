mod subjects_struct;

pub use crate::subjects_struct::{Section, Ticket};

pub fn sociology() -> Vec<Section> {
    vec![
        Section {
            article: 1,
            title: "1".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 1,
                    question: "A community generally includes a number of neighbourhoods. Is it correct?".to_string(),
                    options: Vec::from(
                        [
                            "Yes".to_string(),
                            "No".to_string()
                        ]),
                    correct_answer: "Yes".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 1,
                    question: "Which one is a “Mass Society”?".to_string(),
                    options: Vec::from(
                        ["Gesellschaft".to_string(),
                            "Tribal".to_string(),
                            "Agrarian".to_string(),
                            "Post-Industrial".to_string()]),
                    correct_answer: "Gesellschaft".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 1,
                    question: " A rural community is characterised by:".to_string(),
                    options: Vec::from(
                        ["Community sentiment".to_string(),
                            "Competition".to_string(),
                            "A number of statuses".to_string(),
                            "All options correct".to_string()]),
                    correct_answer: "Community sentiment".to_string(),
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
                    question: "A person in a society occupies:".to_string(),
                    options: Vec::from(
                        ["A number of statuses".to_string(),
                            "No status atoll".to_string(),
                            "Status undefined".to_string(),
                            "Some place".to_string()]),
                    correct_answer: "A number of statuses".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 2,
                    question: "A traditional society is not characterised by:".to_string(),
                    options: Vec::from(
                        ["Competition".to_string(),
                            "With a predominant role for custom and habit".to_string(),
                            "An orientation to the past".to_string(),
                            "Not the future".to_string()]),
                    correct_answer: "Competition".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 2,
                    question: "Society is group, but most groups are not societies. Is it correct?".to_string(),
                    options: Vec::from(
                        ["Yes".to_string(),
                            "No".to_string(),
                            ]),
                    correct_answer: "Yes".to_string(),
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
                    question: "Who related function of institution to biological needs?".to_string(),
                    options: Vec::from(
                        ["Bronisław Malinowski".to_string(),
                            "Karl Marx".to_string(),
                            "Raymond Aron".to_string(),
                            "William Julius Wilson".to_string()]),
                    correct_answer: "Bronisław Malinowski".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 3,
                    question: "Sumner called an institution deliberately formed to satisfy needs:".to_string(),
                    options: Vec::from(
                        ["Enacted".to_string(),
                            "Not enacted".to_string(),
                            "Institution".to_string(),
                            "Bar".to_string()]),
                    correct_answer: "Enacted".to_string(),
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
                    question: "The German word 'Gemeinschaft' means:".to_string(),
                    options: Vec::from(
                        ["Community".to_string(),
                            "Festival".to_string(),
                            "Type of beer".to_string(),
                            "Traditional sausages".to_string()]),
                    correct_answer: "Community".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
    ]
}
