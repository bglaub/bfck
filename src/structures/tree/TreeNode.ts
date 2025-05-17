import { IDGenerator } from "../../utilities/generators/IDGenerator";

/**
 * Tree node that holds data and able to build out a tree structure.
 */
export class TreeNode<T> {
  
  /**
   * The data that the tree node holds.
   */
  public data: T;

  /**
   * Internal identifier that is used to find tree nodes amongst others in the
   * structure.
   */
  private readonly id: string = IDGenerator.get();
  
  /**
   * The number of steps to get to the furthest tree node from this one.
   */
  private height: number = 0;

  /**
   * The number of steps this tree node is from the root, unless it is a root.
   */
  private depth: number = 0;

  /**
   * The parent of this node, unless it is a root.
   */
  private parent: TreeNode<T> | null = null;

  /**
   * The identifier of the sibling to the right of this tree node, unless it is a root.
   */
  private rightSiblingId: string = '';

  /**
   * The identifier of the sibling to the left of this tree node, unless it is a root.
   */
  private leftSiblingId: string = '';

  /**
   * Map of children tree nodes belonging to this tree node.
   */
  private childrenMap: Map<string, TreeNode<T>> = new Map();

  constructor(data: T) {
    this.data = data;
  }

  /**
   * Gets the depth.
   * 
   * @returns depth
   */
  public getDepth(): number {
    return this.depth;
  }

  /**
   * Gets the height.
   * 
   * @returns height
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * Determines if tree node is a root node.
   * 
   * @returns true if root node, false otherwise
   */
  public isRoot(): boolean {
    return this.parent === null && this.depth === 0;
  }

  /**
   * Deterines if tree node has children.
   * 
   * @returns true if has children, false otherwise
   */
  public hasChildren(): boolean {
    return !!this.childrenMap.size;
  }

  /**
   * Gets the parent tree node.
   * 
   * @returns parent, null otherwise
   */
  public getParent(): TreeNode<T> | null {
    return this.parent;
  }

  /**
   * Gets the left sibling tree node.
   * 
   * @returns left sibling, undefined otherwise
   */
  public getLeftSibling(): TreeNode<T> | undefined {
    return this.parent?.childrenMap.get(this.leftSiblingId);
  }

  /**
   * Gets the right sibling tree node.
   * 
   * @returns right sibling, undefined otherwise
   */
  public getRightSibling(): TreeNode<T> | undefined {
    return this.parent?.childrenMap.get(this.rightSiblingId);
  }

  /**
   * Adds tree node as child.
   * 
   * @param node tree node to add as child 
   */
  public addChild(node: TreeNode<T>) {
    if(node.parent) {
      throw new Error('The node cannot be added because it was already added to a tree.');
    }
    node.parent = this;
    node.depth = this.depth + 1;
    if(this.hasChildren()) {
      const sibling: TreeNode<T> = Array.from(this.childrenMap.values()).pop() as TreeNode<T>;
      sibling.rightSiblingId = node.id;
      node.leftSiblingId = sibling.id;
    }
    this.recalculateDepth(node.childrenMap.values(), node.depth);
    this.recalculateHeight(this, node.height);
    this.childrenMap.set(node.id, node);
  }

  /**
   * Detaches tree node from the overall structure.
   */
  public detach() {

    if(!this.parent) {
      throw new Error('Unable to detach node because it is a root node.');
    }

    if(!this.parent.hasChildren()) {
      throw new Error('Unable to find node to detach.');
    }
    
    this.parent.childrenMap.delete(this.id);

    if(this.rightSiblingId) {
      const rightSibling: TreeNode<T> = this.getRightSibling() as TreeNode<T>;
      rightSibling.leftSiblingId = this.leftSiblingId !== '' ? this.leftSiblingId : '';
    }
    if(this.leftSiblingId) {
      const leftSibling: TreeNode<T> = this.getLeftSibling() as TreeNode<T>;
      leftSibling.rightSiblingId = this.rightSiblingId !== '' ? this.rightSiblingId : '';
    }
    this.leftSiblingId = '';
    this.rightSiblingId = '';
    
    this.depth = 0;
    this.recalculateDepth(this.childrenMap.values(), this.depth);
    
    this.parent.height = 0
    const node: TreeNode<T> | null = this.parent.getTallestChild();
    if(node) {
      this.recalculateHeight(this.parent, node.height);
    }
    
    this.parent = null;
  }

  /**
   * Traverses each node by level.
   * 
   * @param fn callback function called as each node is visted.
   */
  public traverse(fn: TreeTraversalCallback<T>): void {
    const queue: TreeNode<T>[] = [ this ];
    
    while(queue.length) {
      const currentNode: TreeNode<T> = queue.shift() as TreeNode<T>
      fn(currentNode);
      queue.push(...Array.from(currentNode.childrenMap.values()));
    }
  }

  /**
   * Recalculates the depth of given nodes and their children.
   * 
   * @param nodes nodes to calculate depth on
   * @param depth current depth
   */
  private recalculateDepth(nodes: IterableIterator<TreeNode<T>>, depth: number): void {
    for (const node of nodes) {
      node.depth = depth + 1;
      this.recalculateDepth(node.childrenMap.values(), node.depth);
    };
  }

  /**
   * Recalculates the height of the given node all the way up to the root.
   * 
   * @param node node to caluclate height on
   * @param height current height
   */
  private recalculateHeight(node: TreeNode<T> | null, height: number): void {
    if (!node) {
      return;
    }
    if (node.height > height + 1) {
      return;
    }
    node.height = height + 1;
    this.recalculateHeight(node.parent, node.height);
  }

  private getTallestChild(): TreeNode<T> | null {
    let node: TreeNode<T> | null = null;

    for(const nextNode of this.childrenMap.values()) {
      if(!node || node.height < nextNode.height) {
        node = nextNode;
      }
    }

    return node;
  }
}

/**
 * Describes the callback for a traversal function.
 */
export type TreeTraversalCallback<T> = (node: TreeNode<T>) => void;