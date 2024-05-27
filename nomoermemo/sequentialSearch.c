#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h> 
#include <time.h>


int seq_search(int list[],int key, int low, int hight){
    int i;
    for(i=low; i<=hight; i++){
        if(list[i]==key){
            return i;
        }
    }
    return -1;
}

int main(void){
    int list[] = {11,28,36,59,24,15,67,48,12,10};
    int key;

/*
    printf("search key:");
    scanf("%d",&key);

    clock_t start, finish; 
    double duration;
    start = clock();

    int val = seq_search(list, key, 0, sizeof(list)/sizeof(int));
    if(val != -1){
        printf("find key %d is in [%d]", key, val);
    }else{
        printf("not find");
    }

    finish = clock();
    duration = (double)(finish - start) / CLOCKS_PER_SEC;
    printf("\nresult use time = %f", duration);
    */

    int select = 1; 
    while(select!=2){
        printf("==메  뉴==\n1.Search\n2.Exit\n\n번호 선택: ");
        scanf("%d", &select);
        if(select==1){
            printf("찾고자하는 키: ");scanf("%d",&key);
            int location = seq_search(list, key, 0, sizeof(list)/sizeof(int));
            printf("\n찾고자하는 키 %d는 %d번째에 위치해 있다.\n\n",key, location+1);
        }else if(select==2){
            //printf("end\n");
        }else{
            printf("\n번호 선택 오류, 다시 입력해주세요.!!!\n\n");
        }
    }
    return 0;
}