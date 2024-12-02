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


fn check_all_increase_or_decrease(report: Vec<i32>) -> bool {
	let mut increasing: bool = true;
	let mut decreasing: bool = true;

	for level_window in report.windows(2) {
		if level_window[0] < level_window[1] {
			decreasing = false;		
		} else if level_window[0] > level_window[1] {
			increasing = false;
		} else {
			continue;
		}

		// inverse of FALSE OR case only
		if !(increasing || decreasing) { break; }
	}

//	println!("Report: {:?} increasing: {}", report, increasing);
//	println!("Report: {:?} decreasing: {}", report, decreasing);
//	println!("FINAL REPORT: {}", increasing != decreasing);
	return increasing != decreasing;
}

fn check_margin() {

}

// https://stackoverflow.com/questions/34090639/how-do-i-convert-a-vector-of-strings-to-a-vector-of-integers-in-a-functional-way
fn problem_1(reports: Vec<String>) -> i32 {
	let mut num_safe: i32 = 0;

	for report in reports.iter() {
		// Convert delimited string to i32 vector
		let report_parsed: Vec<i32> = report.split_whitespace()
											.filter_map(|x| x.parse().ok())
											.collect();		
		//println!("report_parsed: {:?}", report_parsed);
		if !check_all_increase_or_decrease(report_parsed) {
			continue;
		}

		if !check_margin() {
			continue;
		}

		
	}

	return num_safe;
}

fn problem_2() {

}


fn main() {
	let input_filename = String::from("input.txt");
	let input_lines = read_lines(&input_filename);

	problem_1(input_lines);


}
