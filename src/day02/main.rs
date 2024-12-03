use std::fs::read_to_string;

// - Levels are either all increasing or all decreasing
// - Any two adjacent levels differ by at least 1 and at most 3

fn read_lines(filename: &str) -> Vec<String> {
    let mut lines = Vec::new();
    for line in read_to_string(filename).unwrap().lines() {
        lines.push(line.to_string());
    }
    return lines;
}


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

// https://stackoverflow.com/questions/34090639/how-do-i-convert-a-vector-of-strings-to-a-vector-of-integers-in-a-functional-way
fn problem_1(reports: &Vec<String>) -> i32 {
    let mut num_safe: i32 = 0;

    for report in reports.iter() {
        // Convert delimited string to i32 vector
        let report_parsed: Vec<i32> = report.split_whitespace()
                                            .filter_map(|x| x.parse().ok())
                                            .collect();     
        //println!("report_parsed: {:?}", report_parsed);
        if !check_report_increasing_or_decreasing(&report_parsed) {
            continue;
        }
        
        let min_margin: i32 = 1;
        let max_margin: i32 = 3;

        if !check_report_margins(&report_parsed, min_margin, max_margin) {
            continue;
        }
        num_safe += 1;
    }
    return num_safe;
}

fn problem_2(reports: &Vec<String>) -> i32 {
    return 1;
}


fn main() {
    let input_filename = String::from("input.txt");
    let input_lines = read_lines(&input_filename);

    println!("Problem 1: {}, Problem 2: {}",
        problem_1(&input_lines), problem_2(&input_lines));

}
