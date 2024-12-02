use std::fs::read_to_string;

// &str is a string type
fn read_lines(filename: &str) -> Vec<String> {
	let mut lines = Vec::new();

	for line in read_to_string(filename).unwrap().lines() {
		lines.push(line.to_string());
	}

	return lines;
}


pub fn hello_world() {
	println!("Hello World!");
}
