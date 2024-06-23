const pagination = (page) => {
    return { limit: 6, skip: (page - 1) * 6 }
}

export default pagination