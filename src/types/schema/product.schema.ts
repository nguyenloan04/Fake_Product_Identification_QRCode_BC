import { z } from "zod";

const UpdatedBodyReq = z.object({
  name: z.string(),
  price: z.number().negative(),
  category: z.string(),
  unitShipped: z.number().negative(),
  unitOnHand: z.number().negative(),
});

export type UpdatedBodyReqType = z.infer<
  typeof UpdatedBodyReq
>;
