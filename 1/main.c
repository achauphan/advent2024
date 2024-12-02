#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *PATH = "locations.txt";

typedef struct List{
    int val;
    struct List *next;
} List;

typedef struct Map{
    int val;
    int count;
    struct Map *next;
} Map;

void load_list(struct List** list_one, struct List** list_two);
void load_map(struct Map** map_one, struct Map** map_two);
struct List* append_list(struct List* list, int val);
struct Map* append_map(struct Map* map, int val);
int get_map_count(struct Map* map, int val);

int main(){

    struct List *list_one = NULL;
    struct List *list_two = NULL;

    load_list(&list_one, &list_two);

    long total_diff = 0;

    while(list_one != NULL && list_two != NULL){
        long diff = list_one-> val - list_two-> val;
        total_diff += abs(diff);

        list_one = list_one->next;
        list_two = list_two->next;
    }

    printf("Total difference is %d\n", total_diff);

    struct Map *map_one = NULL;
    struct Map *map_two = NULL;

    load_map(&map_one, &map_two);

    long total_score = 0;

    while(map_one != NULL){

        int map_two_count = get_map_count(map_two, map_one->val);
        int score = map_one->val * map_one->count * map_two_count;

        map_one = map_one->next;

        total_score += score;
    }       

    printf("Similarity score is %d\n", total_score);
}

void load_map(struct Map** map_one, struct Map** map_two){
    FILE *file;
    file = fopen(PATH, "r");

    if(file == NULL){
        perror("Failed to open file");
        return;
    }

    char buffer[256];

    while(fgets(buffer, sizeof(buffer), file)){
        char* token = strtok(buffer, " ");
        int val = atoi(token);
        *map_one = append_map(*map_one, val);

        token = strtok(NULL, " ");
        int size = strlen(token);
        token[size] = '\0';
        val = atoi(token);
        *map_two = append_map(*map_two, val);
    }
}

struct Map* append_map(struct Map* map, int val){
    struct Map* curr = map;

    while(curr != NULL){
        if(curr->val == val){
            curr->count++;
            return map;
        }
        curr = curr->next;
    }

    struct Map* ptr = (struct Map*) malloc(sizeof(struct Map));

    ptr->val = val;
    ptr->count = 1;
    ptr->next = map;

    return ptr;
}

int get_map_count(struct Map* map, int val){
    while(map != NULL){

        if(map->val == val){
            return map->count;
        }

        map = map->next;
    }
}

void load_list(struct List** list_one, struct List** list_two){
    FILE *file;
    file = fopen(PATH, "r");

    if(file == NULL){
        perror("Failed to open file");
        return;
    }

    char buffer[256];

    while(fgets(buffer, sizeof(buffer), file)){

        char* token = strtok(buffer, " ");
        int val = atoi(token);
        *list_one = append_list(*list_one, val);

        token = strtok(NULL, " ");
        int size = strlen(token);
        token[size] = '\0';
        val = atoi(token);
        *list_two = append_list(*list_two, val);
    }

}

struct List* append_list(struct List* list, int val){
    struct List* ptr = (struct List*) malloc(sizeof(struct List));
    ptr->val = val;

    struct List* prev = NULL;
    struct List* curr = list;

    while(curr != NULL && curr->val < val){
        prev = curr;
        curr = curr->next;
    }

    ptr->next = curr;
    

    if(prev != NULL){
        prev->next = ptr;
        return list;
    }

    return ptr;

}
