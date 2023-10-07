export interface Mapper<TEntity, TDTO> {
  toEntity(dto: TDTO): TEntity;
  fromEntity(entity: TEntity): TDTO;
}
