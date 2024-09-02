export function paginate(total: number, size: number, page: number) {
  const totalPages = Math.ceil(total / size);

  return {
    total,
    totalPages,
    currentPage: page,
    pageSize: size,
  };
}
