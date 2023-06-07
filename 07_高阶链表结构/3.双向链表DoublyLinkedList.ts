import LinkedList from './1.实现单向链表LinkerList'
import { DoublyNode } from './LinkedNode'

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null
  protected tail: DoublyNode<T> | null = null

  append(value: T): void {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.length++
  }

  prepend(value: T): void {
    const newNode = new DoublyNode(value)

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head!.prev = newNode
      this.head = newNode
    }

    this.length++
  }

  postTraverse() {
    const values: T[] = []
    let current = this.tail
    while (current) {
      values.push(current.value)
      current = current.prev
    }
    console.log(values.join("->"))
  }

  insert(value: T, position: number): boolean {
    if (position < 0 && position > this.length) 
      return false

    if (position === 0) {
      this.prepend(value)
    } else if (position === this.length) {
      this.append(value)
    } else {
      const newNode = new DoublyNode(value)
      const current = this.getNode(position) as DoublyNode<T>

      current.prev!.next = newNode
      newNode.next = current
      newNode.prev = current.prev
      current.prev = newNode

      this.length++
    }

    return true
  }

  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) 
      return null

    let current = this.head
    if (position === 0) {
      if (this.length === 1) {
        this.tail = null
        this.head = null
      } else {
        this.head = this.head!.next
        this.head!.prev = null
      }
    } else if (position === this.length -1) {
      current = this.tail
      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      current = this.getNode(position) as DoublyNode<T>

      current.next!.prev = current.prev
      current.prev!.next = current.next
    }

    this.length--

    return current?.value ?? null
  }
}

console.log('-------------- append/prepend --------------')
const dLinkedList = new DoublyLinkedList<string>()
dLinkedList.append("aaa")
dLinkedList.append("bbb")
dLinkedList.append("ccc")
dLinkedList.append("ddd")

dLinkedList.prepend("abc")
dLinkedList.prepend("cba")

dLinkedList.traverse()
dLinkedList.postTraverse()

console.log('-------------- insert --------------')
dLinkedList.insert("why", 0)
dLinkedList.insert("kobe", 7)
dLinkedList.insert("james", 3)
dLinkedList.traverse()
dLinkedList.postTraverse()

console.log('-------------- removeAt --------------')
dLinkedList.removeAt(0)
dLinkedList.removeAt(7)
dLinkedList.removeAt(2)
dLinkedList.traverse()
dLinkedList.postTraverse()


