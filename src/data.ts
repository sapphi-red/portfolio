interface TreeDataNode {
  name: string
  href?: string
  children?: TreeData
}

export type TreeData = readonly TreeDataNode[]
