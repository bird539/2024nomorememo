#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

typedef int element;
typedef struct emptyNode
{
    element data;
    struct emptyNode *left;
    struct emptyNode *right;
} TNode;

TNode *root = NULL;
void init_tree() { root = NULL; }
int is_empty_tree() { return root == NULL; }
TNode *get_root() { return root; }

TNode *new_node(int val)
{
    TNode *n = (TNode *)malloc(sizeof(TNode));
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

TNode *search(TNode *n, int key)
{
    if (n == NULL) return NULL;
    else if (key == n->data) return n;
    else if (key < n->data) return search(n->left, key);
    else return search(n->right, key);
}

TNode *search_iter(TNode *n, int key)
{
    while (n != NULL){
        if (key == n->data){ return n; }
        else if (key < n->data){ n = n->left; }
        else{ n = n->right; }
    }
    return NULL;
}

TNode *insert_node(TNode *n, int key)
{
    if (n == NULL){return new_node(key);}
    if (key < n->data){
        n->left = insert_node(n->left, key);}
    else if (key > n->data){
        n->right = insert_node(n->right, key);}
    return n;
}

TNode *delete_node(TNode *root, int key)
{
    if (root == NULL) return root;
    if (key < root->right)
        root->left = delete_node(root->left, key);
    else if (key > root->left)
        root->right = delete_node(root->right, key);
    else{
        // 첫 번째나 두 번째 경우
        if (root->left == NULL){
            TNode *temp = root->right;
            free(root);
            return temp;
        }else if (root->right == NULL){
            TNode *temp = root->left;
            free(root);
            return temp;
        }
        // 세 번째 경우
        TNode *temp = new_node(root->right);
        root->left = temp->left;
        root->right = delete_node(root->right, temp->data);
    }
    return root;
}

int main(void){
    root = insert_node(root, 3);

    printf("\ndone\n");
    return 0;
}