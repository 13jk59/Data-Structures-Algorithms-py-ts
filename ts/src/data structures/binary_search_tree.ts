/**
 * @fileoverview This module contains code for a class that represents the
 * binary search tree data structure
 * @package
 */
import { BinaryTreeNode } from './utils/BinaryTree';

/**
 *  This class represents a binary search tree. This data structure is a
 *  rooted binary tree where for any given node, all values in the left subtree
 *  of that node are less than or equal to that nodes value, while all values
 *  in the right subtree of that node are greater than that nodes value
 * 
 *  This allows for efficient lookups, insertions, and deletions in the average
 *  case of O(logN) time. But this data structure does not guarantee
 *  balancing, meaning that in the worst case, lookups, insertions, and 
 *  deletions will take O(N) time and space.

 * @public
 */
class BinarySearchTree {
    root;

    /**
     * @param {number} val Number representing the value at the root of the BST
     */
    constructor(val: number) {
        /** Object of type binaryTreeNode representing the node at the root
            of the binary search tree
         * @public
         * @type {BinaryTreeNode}
         */
        this.root = new BinaryTreeNode(val);
    }

    /**
     *  This method inserts a node into the binary search tree, will ensuring that the 
        binary search tree property is adhered to.

        Time Complexity:
            - best/average: O(logN)
            - worst: O(N) 
        Space Complexity:
            - O(1) b/a/w 
        
     * @param {number} val Integer representing the value to be inserted into the tree 
     * @returns {undefined} 
     */
    insert(val) {
        const node = this.root;
        return this._insertHelper(node, val);
    }

    _insertHelper(node, val) {
        if (node == null) {
            return new BinaryTreeNode(val);
        }
        if (val < node.val) {
            node.left = this._insertHelper(node.left, val);
            return node;
        }

        node.right = this._insertHelper(node.right, val);
        return node;
    }

    /**
     *  This method looks for the node that contains the given value in the binary 
        search tree. 

        Time Complexity:
            - best/average: O(logN)
            - worst: O(N) 
        Space Complexity:
            - O(1) b/a/w 
        
        Inputs:
            - val (int):  Integer representing the node value to look up in the tree 
        Outputs:
            - Node(binaryTreeNode): Binary tree node that contains the given value in the BST 
            or None if no node contains the given value
     * @param {number} val 
     */
    lookup(val) {
        const node = this.root;
        return this._lookupHelper(node, val);
    }

    _lookupHelper(node, val) {
        if (node == null) {
            return null;
        }
        if (val === node.val) {
            return node;
        }
        if (val < node.val) {
            return this._lookupHelper(node.left, val);
        }
        if (val > node.val) {
            return this._lookupHelper(node.right, val);
        }
    }

    delete(val) {
        const node = this.root;
        return this._deleteHelperV(node, val);
    }

    _deleteHelperV(node, val) {
        /*
        This delete helper uses a convenient method to erase the node when the node has two
        children. This node actually doesn't erase the node with the target value, this method
        just replaces its value with the minimum value in the nodes right subtree.

        If you want to actually remove the node when the node has two children, use deleteHelperVA. 
        */
        if (node == null) {
            return null;
        }
        if (val < node.val) {
            node.left = this._deleteHelperV(node.left, val);
            return node;
        }
        if (val > node.val) {
            node.right = this._deleteHelperV(node.right, val);
            return node;
        }

        if (node.left == null && node.right == null) {
            return null;
        }
        if (!node.left) {
            return node.right;
        }
        if (!node.right) {
            return node.left;
        }
        const minVal = this._findMinValV(node.right);
        node.val = minVal;
        node.right = this._deleteHelperV(node.right, minVal);
        return node;
    }

    _findMinValV(node) {
        if (!node.left) {
            return node.val;
        }
        return this._findMinValV(node.left);
    }

    _deleteHelperVA(node, val) {
        /*
        This delete helper is the same as the other one, except when the node has two children, this method
        actually removes the node from the tree rather than just replacing its value with the minimum value
        in the right subtree. 
        */
        if (node == null) {
            return null;
        }
        if (val < node.val) {
            node.left = this._deleteHelperVA(node.left, val);
            return node;
        }
        if (val > node.val) {
            node.right = this._deleteHelperVA(node.right, val);
            return node;
        }

        if (node.left == null && node.right == null) {
            return null;
        }
        if (!node.left) {
            return node.right;
        }
        if (!node.right) {
            return node.left;
        }
        [node.right, minNodeSubtree] = this._findMinNode(node.right);
        minNodeSubtree.left = node.left;
        minNodeSubtree.right = node.right;
        return minNodeSubtree;
    }

    _findMinNode(node) {
        if (node.left == null) {
            return [node.right, node];
        }
        [node.left, minNode] = this._findMinNode(node.left);
        return [node, minNode];
    }
}

export { BinarySearchTree };