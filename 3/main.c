#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

const char *PATH = "memory.txt";

int check_command(char *buffer, int i);
int check_pattern(char *buffer, char *pattern, int i);
int part_one();
int part_two();

int main(){

    int total = part_one();
    printf("A total of %d is given by valid commands\n", total);

    total = part_two();
    printf("A total of %d is given by both valid and enabled commands\n", total);

}

int part_one(){
    FILE *file;
    file = fopen(PATH, "r");

    char buffer[8192];

    int total = 0;

    while(fgets(buffer, sizeof(buffer), file)){
        int size = strlen(buffer);
        buffer[size] = '\0';

        for(int i = 0; i < size; i++){
            int mult = check_command(buffer, i);

            if(mult > 0){
                total += mult;
            }
        }
    }

    return total;
}

int part_two(){
    FILE *file;
    file = fopen(PATH, "r");

    char buffer[8192];

    int total = 0;
    int enabled = 1;

    while(fgets(buffer, sizeof(buffer), file)){
        int size = strlen(buffer);
        buffer[size] = '\0';

        for(int i = 0; i < size; i++){

            int on = check_pattern(buffer, "do()", i);
            int off = check_pattern(buffer, "don't()", i);

            if(on){
                enabled = 1;
            }
            if(off){
                enabled = 0;
            }

            if(!enabled){
                continue;
            }

            int mult = check_command(buffer, i);

            if(mult > 0){
                total += mult;
            }
        }
    }

    return total; 
}

int check_pattern(char *buffer, char *pattern, int i){
    int size = strlen(buffer);

    int pattern_size = strlen(pattern);

    int j = 0;
    for(i; i < size; i++){
        char c = buffer[i];

        if(c == pattern[j]){
            j++;

            if(j == pattern_size){
                return 1;
            }
        }
        else {
            break;
        }
    }

    return 0;
}

int check_command(char *buffer, int i){
    int size = strlen(buffer);

    char *pattern = "mul()";
    int pattern_size = strlen(pattern);

    int split = 0;

    char x_buff[4] = "";
    char y_buff[4] = "";

    int j = 0;
    for(i; i < size; i++){
        char c = buffer[i];

        if(c == pattern[j]){
            j++;

            if(j == pattern_size){
                int y = atoi(y_buff);
                int x = atoi(x_buff);

                return x * y;
            }
        }
        else if(c == ',' && j == 4){
            split = 1;
        }
        else if(isdigit(c) && j == 4){

            if(!split){
                int x_size = strlen(x_buff);

                if(x_size > 4){
                    return -1;
                }

                x_buff[x_size] = c;
            }
            else {
                int y_size = strlen(y_buff);

                if(y_size > 4){
                    return -1;
                }

                y_buff[y_size] = c;
            }

        }
        else{
            return -1;
        }
    }
    return -1;
}