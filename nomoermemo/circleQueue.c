#include <stdio.h>
#include<stdlib.h>
#define MAXQUEUE_SIZE 10

typedef int Element;
Element data[MAXQUEUE_SIZE];
int front; int rear;

void error(char message){
    fprintf(stderr, "%s\n", message);
    exit(1);
}

//큐 초기화
void init_circleQ(){front=rear = 0;}
int is_empty(){ return front==rear; }
int is_full(){ return front ==(rear + 1); }
int size(){ return(rear - front + MAXQUEUE_SIZE) % MAXQUEUE_SIZE; }

void enqueue(Element val){
    if(is_full()){
        error("큐가 포화 error");
    }
    rear = (rear + 1) % MAXQUEUE_SIZE;
    data[rear] = val;
}

Element dequeue(){
    if(is_empty()){
        error("큐가 공백 error");
    }
    front = (front + 1) % MAXQUEUE_SIZE;
    return data[front];
}
Element peek(){
    if(is_empty()){
        error("큐 공백 error peek");
    }
    return data[(front + 1) % MAXQUEUE_SIZE];
}

void print_queue(char msg[]){
    int i, maxi = rear;
    if(front >= rear ){ maxi += MAXQUEUE_SIZE; }

    printf("%s[%2d]=",msg,size());
    for(i=front + 1; i<= maxi; i++){
        printf("%2d ", data[i % MAXQUEUE_SIZE]);
    }
    printf("\n");
}

int main(void){
    init_circleQ();
    for(int i=1; i<10; i++){
        enqueue(i);
    }
    print_queue("원형 큐 enqueue 9회\n");
    printf("\tdequeue() --> %d\n", dequeue());
    printf("\tdequeue() --> %d\n", dequeue());
    printf("\tdequeue() --> %d\n", dequeue());
    print_queue("원형큐 dequeue 3회\n");
}