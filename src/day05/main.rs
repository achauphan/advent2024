#[path = "../utils.rs"] mod utils;



// rules is the filtered set of rules containing the specific page
// check_page_with_rules makes sure that all filtered rules
// are valid for the updates.
fn check_page_with_rules(rules: &Vec<Vec<i32>>, update: &Vec<i32>) -> bool{
  for rule in rules.iter() {
    let left_rule:  i32 = rule[0];
    let right_rule: i32 = rule[1];

    let left_rule_idx  = update.iter().position(|i| *i == left_rule);
    let right_rule_idx = update.iter().position(|i| *i == right_rule);

    if left_rule_idx == None || right_rule_idx == None {
      // println!("Value not found in rule {:?}, skipping...", rule);
      continue;
    }

    if left_rule_idx > right_rule_idx {
      // println!("Invalid rule {:?} for {:?}", rule, update);
      return false;
    }
    // println!("Valid rule {:?} for {:?}. Mid-page: {}", rule, update, update[update.len()/2]);
  }
  return true; // all rules valid for page in update
}


fn problem_1(rules: &Vec<Vec<i32>>, updates: &Vec<Vec<i32>>) -> i32 {
  let mut mid_sum: i32 = 0;

  for update in updates.iter() {
    let mut valid_flag = true;
    for page in update.iter() {
      // Filter rules for ones containing page number
      let filtered_rules: Vec<Vec<i32>> = rules.into_iter()
                                                .filter(|rule| rule.contains(&page))
                                                .cloned()
                                                .collect();
      if !check_page_with_rules(&filtered_rules, &update) {
        valid_flag = false;
        break;
      }
    }
    if valid_flag {
      mid_sum += update[update.len() / 2];
    }
  }
  return mid_sum;
}


fn main() {
  // Read each line from input file as vector of Strings
  let input_filename = String::from("src/day05/input.txt");
  let input_lines: Vec<String> = utils::read_lines(&input_filename);

  // Index where data changes from rules to updates
  let div_idx = input_lines.iter().position(|r| r == "").unwrap();

  let rules:   Vec<String> = input_lines[0..div_idx].to_vec();
  let updates: Vec<String> = input_lines[div_idx+1..input_lines.len()].to_vec();

  // Reformat rules and updates into vectors of integers
  let rules:   Vec<Vec<i32>> = utils::string_to_i32_vector(&rules, '|');
  let updates: Vec<Vec<i32>> = utils::string_to_i32_vector(&updates, ',');

  println!("Problem 1: {}\nProblem 2:",
            problem_1(&rules, &updates));

}




