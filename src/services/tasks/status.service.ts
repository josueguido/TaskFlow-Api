import { IStatus, ICreateStatus, IUpdateStatus } from "../..//interfaces/status.interface"
import { NotFoundError } from "../../errors/NotFoundError";
import { createStatus, getAllStatuses, getStatusById, updateStatus, deleteStatus } from "../../models/status.model";

export const getStatuses = async () => {
  return await getAllStatuses();
};

export const getStatusByIdService = async (id: string) => {
  const status = await getStatusById(id);
  if (!status) {
    throw new NotFoundError('Status not found');
  }
  return status;
}

export const createStatusService = async (data: ICreateStatus): Promise<IStatus> => {
  const { name, order } = data;
  const status = await createStatus(name, order);
  return status ;
}

export const updateStatusService = async (id: number, data: IUpdateStatus): Promise<IStatus> => {
  const { name, order } = data;
  const existingStatus = await getStatusById(id.toString());
  if (!existingStatus) {
    throw new NotFoundError('Status not found');
  }

  const newName = name ?? existingStatus.name;
  const newOrder = order ?? existingStatus.order;
  const updated = await updateStatus(id, newName, newOrder);
  return updated;
};

export const deleteStatusService = async (id: number): Promise<IStatus> => {
  const status = await deleteStatus(id);
  if (!status) {
    throw new NotFoundError('Status not found');
  }
  return await deleteStatus(id);
}
