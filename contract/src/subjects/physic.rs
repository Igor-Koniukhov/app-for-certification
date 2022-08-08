mod subjects_struct;
pub use crate::subjects_struct::{Section, Ticket};

pub fn physic() -> Vec<Section> {
    vec![
        Section {
            article: 1,
            title: "1".to_string(),
            tickets: vec![
                Ticket {
                    id: 1,
                    article_id: 1,
                    question: "Who was the first person to design models of flying machine?".to_string(),
                    options: Vec::from(
                        [
                            "Issac Newton".to_string(),
                            "Leonardo da Vinci".to_string(),
                            "Albert Einstein".to_string(),
                            "Ernest Rutherford".to_string()
                        ]),
                    correct_answer: "Leonardo da Vinci".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 1,
                    question: "Of the following quantities, which one has dimension different from the remaining three?".to_string(),
                    options: Vec::from(
                        ["Angular momentum".to_string(),
                            "Energy per unit volume".to_string(),
                            "Force per unit area".to_string(),
                            "Product of voltage and charge per unit volume".to_string()]),
                    correct_answer: "Angular momentum".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 1,
                    question: "Who invented Aqua-Lung?".to_string(),
                    options: Vec::from(
                        ["Jacques Cousteau".to_string(),
                            "Leonardo da Vinci".to_string(),
                            "Galileo Galilei".to_string(),
                            "Lev Landau".to_string()]),
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
                    question: "Who is the real inventor of helicopter?".to_string(),
                    options: Vec::from(
                        ["Igor Sikorsky".to_string(),
                            "Paul Cornu".to_string(),
                            "Leonardo da Vinci".to_string(),
                            "Albert Einstein".to_string()]),
                    correct_answer: "Igor Sikorsky".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 2,
                    question: "Who invented Archimedean screw?".to_string(),
                    options: Vec::from(
                        ["Archimedean".to_string(),
                            "Leonardo da Vinci".to_string(),
                            "Albert Einstein".to_string(),
                            "Michael Faraday".to_string()]),
                    correct_answer: "1 and 2 only".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 2,
                    question: "The vacant space of a solid’s, electronic energy level is _".to_string(),
                    options: Vec::from(
                        ["Hole".to_string(),
                            "Port".to_string(),
                            "Slot".to_string(),
                            "Gap".to_string()]),
                    correct_answer: "Hole".to_string(),
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
                    question: "A petrol engine used to mix petrol and air in a certain ratio for combustion, is called _".to_string(),
                    options: Vec::from(
                        ["Carburettor".to_string(),
                            "Alternator".to_string(),
                            "Radiator".to_string(),
                            "Transmission".to_string()]),
                    correct_answer: "Carburettor".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 3,
                    question: "Which of the following is a dimensional constant?".to_string(),
                    options: Vec::from(
                        ["Gravitational".to_string(),
                            "Refractive index".to_string(),
                            "Poissons ratio".to_string(),
                            "Relative density".to_string()]),
                    correct_answer: "Gravitational".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 3,
                    question: "What is the potential energy of an electron when it is far away from the nucleus?".to_string(),
                    options: Vec::from(
                        ["1000".to_string(),
                            "0".to_string(),
                            "0.12".to_string(),
                            "unlimited".to_string()]),
                    correct_answer: "5".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 4,
                    article_id: 3,
                    question: "The book Hydrodynamic containing the explanation of Bernoulli’s theorem was published by whom in the year 1738?".to_string(),
                    options: Vec::from(
                        ["Daniel Bernoulli".to_string(),
                            "Albert Einstein".to_string(),
                            "Marie Curie".to_string(),
                            "Enrico Fermi".to_string()]),
                    correct_answer: "Daniel Bernoulli".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
    ]
}
