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
                    question: "What is Sporophyll?".to_string(),
                    options: Vec::from(
                        [
                            "Leaves with associated sporangia".to_string(),
                            "Leaves with associated epidermis".to_string(),
                            "Leaves with associated chloroplasts".to_string(),
                            "Leaves with associated spongy mesophyl".to_string()
                        ]),
                    correct_answer: "Leaves with associated sporangia".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 1,
                    question: "Which is the first oxygen-producing organism?".to_string(),
                    options: Vec::from(
                        ["Autotrophic cyanobacteria".to_string(),
                            "Staphylococcus haemolyticus".to_string(),
                            "Moraxella spp".to_string(),
                            "Bacillus spp".to_string()]),
                    correct_answer: "Autotrophic cyanobacteria".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 3,
                    article_id: 1,
                    question: "Archaebacteria differ from eubacteria in:".to_string(),
                    options: Vec::from(
                        ["Cell membrane".to_string(),
                            "Mode of nutrition".to_string(),
                            "Cell shape".to_string(),
                            "Mode of reproduction".to_string()]),
                    correct_answer: "Cell membrane".to_string(),
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
                    question: "Viruses have:".to_string(),
                    options: Vec::from(
                        ["DNA enclosed in a protein coat".to_string(),
                            "Prokaryotic nucleus".to_string(),
                            "Single chromosome".to_string(),
                            "Both DNA and RNA".to_string()]),
                    correct_answer: "DNA enclosed in a protein coat".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 2,
                    article_id: 2,
                    question: "The motile bacteria are able to move by:".to_string(),
                    options: Vec::from(
                        ["Flagella".to_string(),
                            "Fimbriae".to_string(),
                            "Cilia".to_string(),
                            "Pili".to_string()]),
                    correct_answer: "Flagella".to_string(),
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
                    question: "True nucleus is absent in:".to_string(),
                    options: Vec::from(
                        ["Anabaena".to_string(),
                            "Mucor".to_string(),
                            "Vaucheria".to_string(),
                            "Volvox".to_string()]),
                    correct_answer: "Anabaena".to_string(),
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
                    question: "Which of the following structures is not found in a prokaryotic cell?".to_string(),
                    options: Vec::from(
                        ["Nuclear envelope".to_string(),
                            "Ribosome".to_string(),
                            "Mesosome".to_string(),
                            "Plasma membrane".to_string()]),
                    correct_answer: "Nuclear envelope".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
                Ticket {
                    id: 4,
                    article_id: 3,
                    question: "The imperfect fungi which are decomposer of litter and help in mineral cycling belong to:".to_string(),
                    options: Vec::from(
                        ["Deuteromycetes".to_string(),
                            "Basidiomycetes".to_string(),
                            "Phycomycetes".to_string(),
                            "Ascomycetes".to_string()]),
                    correct_answer: "Deuteromycetes".to_string(),
                    pass: false,
                    started: "".to_string(),
                    finished: "".to_string(),
                },
            ],
        },
    ]
}
