import {TreeNode } from './TreeNode';

describe('TreeNode', () => {
  describe('constructor', () => {
    it('should construct', () => {
      const treeNode: TreeNode<string> = new TreeNode('A');
      expect(treeNode.data).toEqual('A');
      expect(treeNode.depth).toEqual(0);
      expect(treeNode.height).toEqual(0);
      expect(treeNode.isRoot()).toEqual(true);
      expect(treeNode.hasChildren()).toEqual(false);
    });
  });

  describe('addChild', () => {
    it('should add child', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');

      aNode.addChild(bNode);
      
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(1);
      expect(bNode.isRoot()).toEqual(false);
      expect(bNode.hasChildren()).toEqual(false);
    });

    it('should calculate depth', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');

      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      eNode.addChild(hNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);

      expect(bNode.depth).toEqual(0);
      expect(dNode.depth).toEqual(1);
      expect(eNode.depth).toEqual(1);
      expect(fNode.depth).toEqual(1);
      expect(hNode.depth).toEqual(2);
      expect(gNode.depth).toEqual(1);
      expect(iNode.depth).toEqual(2);

      aNode.addChild(bNode);
      aNode.addChild(cNode);

      expect(bNode.depth).toEqual(1);
      expect(dNode.depth).toEqual(2);
      expect(eNode.depth).toEqual(2);
      expect(fNode.depth).toEqual(2);
      expect(hNode.depth).toEqual(3);
      expect(gNode.depth).toEqual(2);
      expect(iNode.depth).toEqual(3);
    });
    
    it('should calculate height', () => {
      
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');
      const jNode: TreeNode<string> = new TreeNode('J');
      const kNode: TreeNode<string> = new TreeNode('K');

      expect(aNode.height).toEqual(0);

      bNode.addChild(dNode);

      expect(bNode.height).toEqual(1);
      expect(dNode.height).toEqual(0);

      bNode.addChild(eNode);
      
      expect(bNode.height).toEqual(1);
      expect(eNode.height).toEqual(0);

      bNode.addChild(fNode);
      
      expect(bNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);

      eNode.addChild(hNode);

      expect(bNode.height).toEqual(2);
      expect(eNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);

      cNode.addChild(gNode);

      expect(cNode.height).toEqual(1);
      expect(gNode.height).toEqual(0);

      gNode.addChild(iNode);
      
      expect(cNode.height).toEqual(2);
      expect(gNode.height).toEqual(1);
      expect(iNode.height).toEqual(0);

      aNode.addChild(bNode);
      
      expect(aNode.height).toEqual(3);

      aNode.addChild(cNode);

      expect(aNode.height).toEqual(3);
      expect(bNode.height).toEqual(2);
      expect(cNode.height).toEqual(2);
      expect(dNode.height).toEqual(0);
      expect(eNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);
      expect(gNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);
      expect(iNode.height).toEqual(0);

      jNode.addChild(kNode);
      aNode.addChild(jNode);

      expect(aNode.height).toEqual(3);
      expect(bNode.height).toEqual(2);
      expect(cNode.height).toEqual(2);
      expect(dNode.height).toEqual(0);
      expect(eNode.height).toEqual(1);
      expect(fNode.height).toEqual(0);
      expect(gNode.height).toEqual(1);
      expect(hNode.height).toEqual(0);
      expect(iNode.height).toEqual(0);
      expect(jNode.height).toEqual(1);
      expect(kNode.height).toEqual(0);
    });

    it('should error if node added as child to two different nodes', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      
      aNode.addChild(bNode);
      
      expect(() => {
        cNode.addChild(bNode);
      }).toThrow('The node cannot be added because it was already added to a tree.');
    })
  });

  describe('detach', () => {
    it('should detach child', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');

      aNode.addChild(bNode);
      
      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(true);
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(1);
      expect(bNode.isRoot()).toEqual(false);
      expect(bNode.hasChildren()).toEqual(false);

      bNode.detach();

      expect(aNode.data).toEqual('A');
      expect(aNode.depth).toEqual(0);
      expect(aNode.isRoot()).toEqual(true);
      expect(aNode.hasChildren()).toEqual(false);
      expect(bNode.data).toEqual('B');
      expect(bNode.depth).toEqual(0);
      expect(bNode.isRoot()).toEqual(true);
      expect(bNode.hasChildren()).toEqual(false);
    });
  });

  describe('traverse', () => {
    it('should traverse all nodes in order', () => {
      const aNode: TreeNode<string> = new TreeNode('A');
      const bNode: TreeNode<string> = new TreeNode('B');
      const cNode: TreeNode<string> = new TreeNode('C');
      const dNode: TreeNode<string> = new TreeNode('D');
      const eNode: TreeNode<string> = new TreeNode('E');
      const fNode: TreeNode<string> = new TreeNode('F');
      const gNode: TreeNode<string> = new TreeNode('G');
      const hNode: TreeNode<string> = new TreeNode('H');
      const iNode: TreeNode<string> = new TreeNode('I');

      aNode.addChild(bNode);
      aNode.addChild(cNode);
      bNode.addChild(dNode);
      bNode.addChild(eNode);
      bNode.addChild(fNode);
      eNode.addChild(hNode);
      cNode.addChild(gNode);
      gNode.addChild(iNode);

      const nodes: TreeNode<string>[] = [];

      aNode.traverse((node: TreeNode<string>): void => {
        nodes.push(node);
      });

      expect(nodes[0].data).toEqual('A');
      expect(nodes[1].data).toEqual('B');
      expect(nodes[2].data).toEqual('C');
      expect(nodes[3].data).toEqual('D');
      expect(nodes[4].data).toEqual('E');
      expect(nodes[5].data).toEqual('F');
      expect(nodes[6].data).toEqual('G');
      expect(nodes[7].data).toEqual('H');
      expect(nodes[8].data).toEqual('I');
    });
  });
});