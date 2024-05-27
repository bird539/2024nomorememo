#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <time.h>
int search_binary(int list[], int key, int low, int hight){
    int midle;
    while (low <= hight){
        midle = (low+hight)/2;
        if (key == list[midle]){
            return midle;
        }else if (key > list[midle]){
            low = midle + 1;
        }else if (key < list[midle]){
            hight = midle - 1;
        }
    }
    return -1;
}

int main(void)
{
    int list1[] = {5,8,15,25,27,33,39,42,55,72}; 
    //오름차순으로 정렬되어야 있어야 함
    int target; int size = sizeof(list1)/sizeof(int);

    printf("search key:");
    scanf("%d",&target);

    clock_t start, finish; 
    double duration;
    start = clock();

    int val = search_binary(list1, target, 0, size);
    if(val != -1){
        printf("find key %d is in [%d]", target, val);
        printf("\nlist[%d]=%d",val, list1[val]);
    }else{
        printf("not find");
    }

    finish = clock();
    duration = (double)(finish - start) / CLOCKS_PER_SEC;
    printf("\nresult use time = %f", duration);
    return 0;
}