#![allow(dead_code)]

use std::fs::read_to_string;

// &str is a string type
pub fn read_lines(filename: &str) -> Vec<String> {
  let mut lines = Vec::new();

  for line in read_to_string(filename).unwrap().lines() {
    lines.push(line.to_string());
  }

  return lines;
}


pub fn string_to_i32_vector(string_vec: &Vec<String>, delim: char) -> Vec<Vec<i32>>{
  let mut i32_vec = Vec::new();
  for element in string_vec.iter() {
    let parsed: Vec<i32>;
    if delim != ' ' {
      parsed = element.split(delim)
                      .filter_map(|x| x.parse().ok())
                      .collect();
    } else {
      parsed = element.split_whitespace()
                      .filter_map(|x| x.parse().ok())
                      .collect();
    }
    i32_vec.push(parsed);
  }
  return i32_vec;
}



pub fn hello_world() {
  println!("Hello World!");
}
