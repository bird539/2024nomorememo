#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

typedef char TElement;
typedef struct BinTrNode
{
    TElement data;
    struct BinTrNode *left;
    struct BinTrNode *right;
} TNode;
TNode *root = NULL;
void init_tree() { root = NULL; }
int is_empty_tree() { return root == NULL; }
TNode *get_root() { return root; }

TNode *create_tree(TElement val, TNode *l, TNode *r)
{
    TNode *n = (TNode *)malloc(sizeof(TNode));
    n->data = val;
    n->left = l;
    n->right = r;
    return n;
}
void preorder(TNode *n)
{
    if (n != NULL)
    {
        printf("[%c] ", n->data);
        preorder(n->left);
        preorder(n->right);
    }
}

void inorder(TNode *n)
{
    if (n != NULL)
    {
        inorder(n->left);
        printf("[%c] ", n->data);
        inorder(n->right);
    }
}
void postorder(TNode *n)
{
    if (n != NULL)
    {
        postorder(n->left);
        postorder(n->right);
        printf("[%c] ", n->data);
    }
}

void main()
{
    TNode *b, *c, *d, *e, *f;
    init_tree();
    d = create_tree('D', NULL, NULL);
    e = create_tree('E', NULL, NULL);
    b = create_tree('B', d, e);
    f = create_tree('F', NULL, NULL);
    c = create_tree('C', f, NULL);
    root = create_tree('A', b, c);
    // 트리 테스트 프로그램 추가
    printf("\n In-Order : ");
    inorder(root);
    printf("\n Pre-Order : ");
    preorder(root);
    printf("\n Post-Order : ");
    postorder(root);
    return 0;
}