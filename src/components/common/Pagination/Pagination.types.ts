export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalItems: number; // Novo: total de itens para exibição
  itemsPerPage: number; // Novo: número de itens por página
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void; // Novo: função para mudar o número de itens por página
}
