import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export class BaseModel {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    // Date de création automatique de notre utilisator
    @CreateDateColumn()
    public creationDate!: Date;

    // Date de modification de l'entité
    @UpdateDateColumn()
    public updateDate!: Date;

    // date de suppression => SOFT DELETE
    @DeleteDateColumn()
    public deletionDate?: Date;
}
