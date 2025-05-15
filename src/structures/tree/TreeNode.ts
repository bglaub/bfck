import { IDGenerator } from "../../utilities/generators/IDGenerator";

export class TreeNode<T> {
  
  public data: T;
  private readonly id: string = IDGenerator.get();
  private _height: number = 0;
  private _depth: number = 0;
  private parent: TreeNode<T> | null = null;
  private rightSibling: string = '';
  private leftSibling: string = '';
  private childrenMap: Map<string, TreeNode<T>> = new Map();

  constructor(data: T) {
    this.data = data;
  }

  public get depth(): number {
    return this._depth;
  }

  public get height(): number {
    return this._height;
  }

  public isRoot(): boolean {
    return this.parent === null && this._depth === 0;
  }

  public hasChildren(): boolean {
    return !!this.childrenMap.size;
  }

  public addChild(node: TreeNode<T>) {
    if(node.parent) {
      throw new Error('The node cannot be added because it was already added to a tree.');
    }
    node.parent = this;
    node._depth = this._depth + 1;
    if(this.hasChildren()) {
      const sibling: TreeNode<T> = Array.from(this.childrenMap.values()).pop() as TreeNode<T>;
      sibling.rightSibling = node.id;
      node.leftSibling = sibling.id;
    }
    this.reDepthChildren(node.childrenMap.values(), node._depth);
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

    if(this.rightSibling) {
      const rightSibling: TreeNode<T> = this.parent.childrenMap.get(this.rightSibling) as TreeNode<T>;
      rightSibling.leftSibling = this.leftSibling !== '' ? this.leftSibling : '';
    }
    if(this.leftSibling) {
      const leftSibling: TreeNode<T> = this.parent.childrenMap.get(this.leftSibling) as TreeNode<T>;
      leftSibling.rightSibling = this.rightSibling !== '' ? this.rightSibling : '';
    }
    this.leftSibling = '';
    this.rightSibling = '';
    
    this._depth = 0;
    this.reDepthChildren(this.childrenMap.values(), this._depth);
    
    this.parent._height = 0
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
      node._depth = depth + 1;
      this.reDepthChildren(node.childrenMap.values(), node._depth);
    };
  }

  private reHeightParent(node: TreeNode<T> | null, height: number) {
    if (!node) {
      return;
    }
    if (node._height > height + 1) {
      return;
    }
    node._height = height + 1;
    this.reHeightParent(node.parent, node._height);
  }

  private getTallestChild(): TreeNode<T> | null {
    let node: TreeNode<T> | null = null;

    for(const nextNode of this.childrenMap.values()) {
      if(!node || node._height < nextNode._height) {
        node = nextNode;
      }
    }

    return node;
  }

  
}

export type TreeTraversalCallback<T> = (node: TreeNode<T>) => void;