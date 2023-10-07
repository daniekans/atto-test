export interface CrudRepository<TEntity, TKey> {
  create(entity: TEntity): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
  findOne(id: TKey): Promise<TEntity | null>;
  update(farmer: TEntity, id: TKey): Promise<TEntity>;
  delete(id: TKey): Promise<void>;
}
