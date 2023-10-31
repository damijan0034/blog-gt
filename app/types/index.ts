

export type TCategory={
    id:string,
    catName:string
}

export type TPost={
    id: string,
    title: string,
    content: string,
    imgUrl?: string,
    publicId?: string,
    catName?: string,
    authorEmail: string,
    links: string[] | null,
    createdAt: string,
    author: {
        name:string
    }
  }
