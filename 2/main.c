#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *PATH = "reports.txt";

int part_one();
int part_two();

int main(){
    int safe = part_one();
    printf("There are %d safe reports\n", safe);

    safe = part_two();
    printf("There are %d safe reports with omissions\n", safe);

}

int part_one(){
    FILE *file;
    file = fopen(PATH, "r");

    if(file == NULL){
        perror("Failed to open file");
        return -1;
    }

    char buffer[256];
    int safe = 0;

    while(fgets(buffer, sizeof(buffer), file)){
        int size = strlen(buffer);
        buffer[size] = '\0';

        int prev = 0;
        int sign = 0;
        
        int valid = 1;
        char* token = strtok(buffer, " ");

        prev = atoi(token);
        token = strtok(NULL, " ");

        while(token != NULL){
            int curr = atoi(token);
            int diff = curr - prev;


            if(abs(diff) > 3 || abs(diff) < 1){
                valid = 0;
                break;
            }

            if(sign == 0){
                sign = abs(diff) / diff;
            }
            
            if((diff < 0 && sign > 0) || (diff > 0 && sign < 0)){
                valid = 0;
                break;
            }


            prev = curr;
            token = strtok(NULL, " ");
        }
        
        safe += valid;
    }

    return safe;
}

int part_two(){
    FILE *file;
    file = fopen(PATH, "r");

    if(file == NULL){
        perror("Failed to open file");
        return -1;
    }

    char buffer[256];
    int safe = 0;

    while(fgets(buffer, sizeof(buffer), file)){
        int size = strlen(buffer);
        buffer[size] = '\0';

        int report[128];

        char* token = strtok(buffer, " ");

        int count = 0;
        while(token != NULL && count < 128){
            report[count] = atoi(token);

            count++;
            token = strtok(NULL, " ");
        }

        for(int i = 0; i < count; i++){
            int omit[count-1];

            for(int j = 0; j < count; j++){
                
                if(j < i){
                    omit[j] = report[j];
                }
                else if(j > i){
                    omit[j-1] = report[j];
                }

            }

            int valid = 1;
            int sign = 0;

            for(int j = 0; j < count-2; j++){
                int diff = omit[j] - omit[j+1];

                if(abs(diff) > 3 || abs(diff) < 1){
                    valid = 0;
                    break;
                }

                if(sign == 0){
                    sign = abs(diff) / diff;
                }

                if((diff < 0 && sign > 0) || (diff > 0 && sign < 0)){
                    valid = 0;
                    break;
                }
            }

            if(valid){
                safe++;
                break;
            }
        }
    }

    return safe;
}
