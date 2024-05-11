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

//ť �ʱ�ȭ
void init_circleQ(){front=rear = 0;}
int is_empty(){ return front==rear; }
int is_full(){ return front ==(rear + 1); }
int size(){ return(rear - front + MAXQUEUE_SIZE) % MAXQUEUE_SIZE; }

void enqueue(Element val){
    if(is_full()){
        error("ť�� ��ȭ error");
    }
    rear = (rear + 1) % MAXQUEUE_SIZE;
    data[rear] = val;
}

Element dequeue(){
    if(is_empty()){
        error("ť�� ���� error");
    }
    front = (front + 1) % MAXQUEUE_SIZE;
    return data[front];
}
Element peek(){
    if(is_empty()){
        error("ť ���� error peek");
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
    print_queue("���� ť enqueue 9ȸ\n");
    printf("\tdequeue() --> %d\n", dequeue());
    printf("\tdequeue() --> %d\n", dequeue());
    printf("\tdequeue() --> %d\n", dequeue());
    print_queue("����ť dequeue 3ȸ\n");
}