#[path = "../utils.rs"] mod utils;

fn check_report_increasing_or_decreasing(report: &Vec<i32>) -> bool {
    let mut is_increasing: bool = true;
    let mut is_decreasing: bool = true;
    for level_window in report.windows(2) {
        if level_window[0] < level_window[1] {
            is_decreasing = false;     
        } else if level_window[0] > level_window[1] {
            is_increasing = false;
        } else {
            continue;
        }
        // inverse of FALSE OR case only
        if !(is_increasing || is_decreasing) { break; }
    }

//  println!("Report: {:?} increasing: {}", report, increasing);
//  println!("Report: {:?} decreasing: {}", report, decreasing);
//  println!("FINAL REPORT: {}", increasing != decreasing);
    return is_increasing != is_decreasing;
}

fn check_report_margins(report: &Vec<i32>, min: i32, max: i32) -> bool {
    for level_window in report.windows(2) {
        let diff: i32 = (level_window[0] - level_window[1]).abs();
        if  !(diff >= min && diff <= max) {
            return false;
        }
    }
    return true;
}


fn problem_1(reports: &Vec<Vec<i32>>) -> i32 {
    let mut num_safe: i32 = 0;

    let min_margin: i32 = 1;
    let max_margin: i32 = 3;
    
    for report in reports.iter() {
        if !check_report_increasing_or_decreasing(&report) {
            continue;
        }

        if !check_report_margins(&report, min_margin, max_margin) {
            continue;
        }
        num_safe += 1;
    }
    return num_safe;
}


fn problem_2(reports: &Vec<Vec<i32>>) -> i32 {
    let mut num_safe:  i32 = 0; 

    let min_margin: i32 = 1;
    let max_margin: i32 = 3;

    for report in reports.iter() {

        if !check_report_increasing_or_decreasing(&report)
            || !check_report_margins(&report, min_margin, max_margin) {
            
            // Check for cases where removing one level from a report
            // passes both checks to be considered safe.
            for (level_idx, _) in report.iter().enumerate() {
               let mut report_copy = report.clone();
               report_copy.remove(level_idx);
               if !check_report_increasing_or_decreasing(&report_copy) {
                   continue;
               }
               if !check_report_margins(&report_copy, min_margin, max_margin) {
                   continue;
               }
               num_safe += 1;
               break; // break out of this report, it is safe now
            }

        } else {
            num_safe += 1;
        }
    }
    return num_safe;
}


fn main() {
    let input_filename = String::from("src/day02/input.txt");
    let input_lines = utils::read_lines(&input_filename);
    let parsed_input: Vec<Vec<i32>> = utils::string_to_i32_vector(&input_lines, ' ');
    println!("Problem 1: {}\nProblem 2: {}",
        problem_1(&parsed_input), problem_2(&parsed_input));

}
