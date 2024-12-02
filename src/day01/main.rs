use std::fs::read_to_string;

// &str is a string type
fn read_lines(filename: &str) -> Vec<String> {
	let mut lines = Vec::new();

	for line in read_to_string(filename).unwrap().lines() {
		lines.push(line.to_string());
	}

	return lines;
}


fn problem_1(group_1: &mut Vec<i32>, group_2: &mut Vec<i32>) -> i32 {
	group_1.sort();
	group_2.sort();

	let mut total_diff = 0;
	// zip does some fancy stuff combining vectors into a vector tuple
	for (group_1_val, group_2_val) in group_1.iter().zip(group_2.iter()) {
		//println!("G1 {}, G2 {}", group_1_val, group_2_val);
		total_diff += (group_1_val - group_2_val).abs();	
	}
	
	return total_diff;
}

fn problem_2(group_1: Vec<i32>, group_2: Vec<i32>) -> i32 {
	let mut similarity_score = 0;

	for group_1_val in group_1.iter() {
		let frequency = group_2.iter().filter(|&group_2_val| *group_2_val == *group_1_val).count();	
		similarity_score += group_1_val * (frequency as i32);
	}

	return similarity_score;
}


fn main() {
	println!("Hello World!");
	let input_filename = String::from("input.txt");

	let input_lines = read_lines(&input_filename);
	
	// Convert '   ' separated lines into two vectors
	let mut group_1 = Vec::new();
	let mut group_2 = Vec::new();

	for line in input_lines {
		let line_splice: Vec<&str> = line.split("   ").collect();
		group_1.push(line_splice[0].parse::<i32>().unwrap());
		group_2.push(line_splice[1].parse::<i32>().unwrap());
		//println!("PARTS: {}, {}", line_splice[0].to_string(), line_splice[1].to_string());
	}


	let result_1 = problem_1(&mut group_1, &mut group_2);
	let result_2 = problem_2(group_1, group_2);
	println!("Problem 1 result: {} \n
				Problem 2 result: {}", result_1, result_2);


}
