mod subjects_struct;

pub use crate::subjects_struct::{Section, Ticket};

pub fn chemistry() -> Vec<Section> {
    vec![
        Section {
            article: 1,
            title: "1".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 1,
                    question: "When a beam of white rays is dispersed by a prism which colour will be refracted to a larger extent?".to_string(),
                    options: Vec::from(
                        [
                            "red".to_string(),
                            "blue".to_string(),
                            "yellow".to_string(),
                            "violet".to_string()
                        ]),
                    correct_answer: "violet".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 1,
                    question: "The modern atomic mass unit is based on__".to_string(),
                    options: Vec::from(
                        ["C-12".to_string(),
                            "N-14".to_string(),
                            "O-16".to_string(),
                            "H-1".to_string()]),
                    correct_answer: "C-12".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 1,
                    question: "Which element on adding to natural rubber makes it less sticky in hot weather and less hard in cold weather?".to_string(),
                    options: Vec::from(
                        ["Chlorine".to_string(),
                            "Sulfur".to_string(),
                            "Sodium".to_string(),
                            "Carbon".to_string()]),
                    correct_answer: "Sulfur".to_string(),
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
                    question: "Glass is made out of what?".to_string(),
                    options: Vec::from(
                        ["Carbon".to_string(),
                            "Silicon".to_string(),
                            "Sand".to_string(),
                            "Concrete".to_string()]),
                    correct_answer: "Sand".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 2,
                    question: "The scientist who introduced the model of the atom similar to the solar system?".to_string(),
                    options: Vec::from(
                        ["Niels Bohr".to_string(),
                            "Robert Boyle".to_string(),
                            "Ernest Rutherford".to_string(),
                            "Robert Bunsen".to_string()]),
                    correct_answer: "Ernest Rutherford".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 2,
                    question: "What happens when an electron moves nearer to the nucleus of the atom?".to_string(),
                    options: Vec::from(
                        ["Antimatter".to_string(),
                            "An explosion".to_string(),
                            "Its energy increases".to_string(),
                            "Its energy decreases".to_string()]),
                    correct_answer: "Its energy decreases".to_string(),
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
                    question: "Which chemical causes Minamata disease?".to_string(),
                    options: Vec::from(
                        ["Minamata".to_string(),
                            "Mercury".to_string(),
                            "Manganese".to_string(),
                            "Hassium".to_string()]),
                    correct_answer: "Mercury".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 3,
                    question: "Which element has no neutrons in it?".to_string(),
                    options: Vec::from(
                        ["All options correct".to_string(),
                            "Hydrogen".to_string(),
                            "Helium".to_string(),
                            "Neon".to_string()]),
                    correct_answer: "Hydrogen".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 3,
                    question: "Which element can easily form chains?".to_string(),
                    options: Vec::from(
                        ["Phosphorus".to_string(),
                            "Silicon".to_string(),
                            "Carbon".to_string(),
                            "Uranium".to_string()]),
                    correct_answer: "Carbon".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 4,
                    article_id: 3,
                    question: "Cement mixed with gravel, sand, and water is called what?".to_string(),
                    options: Vec::from(
                        ["Stone".to_string(),
                            "Concrete".to_string(),
                            "Rock".to_string(),
                            "Marble".to_string()]),
                    correct_answer: "Concrete".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
    ]
}
