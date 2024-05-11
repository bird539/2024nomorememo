#include <stdio.h>
#include<stdlib.h>
#define MAXQUEUE_SIZE 5

typedef int element;
typedef struct QueueType {
    int front;
    int rear;
    element data[MAXQUEUE_SIZE];
}QueueType;

//큐 초기화
void init_queue(QueueType* q){ q->rear = -1; q->front = -1; }

void queue_print(QueueType* q){
    for(int i=0;i<MAXQUEUE_SIZE;i++){
        if(i<=q->front || i>q->rear){
            printf("   |");
        }else{
            printf("%2d| ", q->data[i]);
        }
    }
    printf("\n");
}
int is_full(QueueType* q){
    if(q->rear == MAXQUEUE_SIZE - 1){
        return 1;
    }else{
        return 0;
    }
}
int is_empty(QueueType* q){
    if(q->front == q->rear){
        return 1;
    }else{
        return 0;
    }
}
void error(char message){
    fprintf(stderr, "%s\n", message);
    exit(1);
}

void enqueue(QueueType* q, int item){
    if(is_full(q)){
        error("큐가 포화상태입니다.");
        return;
    }
    q->data[++(q->rear)] = item;
}
element dequeue(QueueType* q){
    if(is_empty(q)){
        error("큐가 공백상태입니다.");
        return -1;
    }
    int item = q->data[++(q->front)];
    return item;
}

int main(void){
    QueueType qq; init_queue(&qq);
    int cnt=1; int item = 0; int len = 5;

    int num[5];
    printf("5개 숫자 입력 : ");
    scanf("%d %d %d %d %d",&num[0],&num[1],&num[2],&num[3],&num[4]);
    
    for(int i=0; i<len; i++){
        enqueue(&qq, num[i] );
        queue_print(&qq);
        cnt++;
    }

    for(int i=0; i<2; i++){
        item = dequeue(&qq);
        //printf("item = %d ", item);
        queue_print(&qq);
    }

    /*
    for(int i=0; i<len; i++){
        enqueue(&qq, cnt*10 );
        queue_print(&qq);
        cnt++;
    }

    for(int i=0; i<len; i++){
        item = dequeue(&qq);
        queue_print(&qq);
    }
    */

    return 0;
}