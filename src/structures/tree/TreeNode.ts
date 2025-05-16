import { IDGenerator } from "../../utilities/generators/IDGenerator";

export class TreeNode<T> {
  
  public data: T;
  private readonly id: string = IDGenerator.get();
  private height: number = 0;
  private depth: number = 0;
  private parent: TreeNode<T> | null = null;
  private rightSiblingId: string = '';
  private leftSiblingId: string = '';
  private childrenMap: Map<string, TreeNode<T>> = new Map();

  constructor(data: T) {
    this.data = data;
  }

  public getDepth(): number {
    return this.depth;
  }

  public getHeight(): number {
    return this.height;
  }

  public isRoot(): boolean {
    return this.parent === null && this.depth === 0;
  }

  public hasChildren(): boolean {
    return !!this.childrenMap.size;
  }

  public getLeftSibling(): TreeNode<T> | undefined {
    return this?.parent?.childrenMap.get(this.leftSiblingId);
  }

  public getRightSibling(): TreeNode<T> | undefined {
    return this?.parent?.childrenMap.get(this.rightSiblingId);
  }

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
    this.reDepthChildren(node.childrenMap.values(), node.depth);
    this.reHeightParent(this, node.height);
    this.childrenMap.set(node.id, node);
  }

  public detach() {

    if(this.isRoot()) {
      throw new Error('Unable to detach node because it is a root node.');
    }

    if(!this.parent?.hasChildren()) {
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
    this.reDepthChildren(this.childrenMap.values(), this.depth);
    
    this.parent.height = 0
    const node: TreeNode<T> | null = this.parent.getTallestChild();
    if(node) {
      this.reHeightParent(this.parent, node.height);
    }
    
    this.parent = null;
  }

  public traverse(fn: TreeTraversalCallback<T>): void {
    const queue: TreeNode<T>[] = [ this ];
    
    while(queue.length) {
      const currentNode: TreeNode<T> = queue.shift() as TreeNode<T>
      fn(currentNode);
      queue.push(...Array.from(currentNode.childrenMap.values()));
    }
  }

  private reDepthChildren(nodes: MapIterator<TreeNode<T>>, depth: number) {
    for (const node of nodes) {
      node.depth = depth + 1;
      this.reDepthChildren(node.childrenMap.values(), node.depth);
    };
  }

  private reHeightParent(node: TreeNode<T> | null, height: number) {
    if (!node) {
      return;
    }
    if (node.height > height + 1) {
      return;
    }
    node.height = height + 1;
    this.reHeightParent(node.parent, node.height);
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

export type TreeTraversalCallback<T> = (node: TreeNode<T>) => void;