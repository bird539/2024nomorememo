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
        printf("==��  ��==\n1.Search\n2.Exit\n\n��ȣ ����: ");
        scanf("%d", &select);
        if(select==1){
            printf("ã�����ϴ� Ű: ");scanf("%d",&key);
            int location = seq_search(list, key, 0, sizeof(list)/sizeof(int));
            printf("\nã�����ϴ� Ű %d�� %d��°�� ��ġ�� �ִ�.\n\n",key, location+1);
        }else if(select==2){
            //printf("end\n");
        }else{
            printf("\n��ȣ ���� ����, �ٽ� �Է����ּ���.!!!\n\n");
        }
    }
    return 0;
}