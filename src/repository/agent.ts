import { Agent, Prisma } from '@prisma/client';
import { prismaClient } from '../prisma/client';

export const createAgent = (agent: Prisma.AgentCreateInput) =>
  prismaClient.agent.create({
    data: agent,
  });

export const getAllAgents = (): Promise<Agent[]> =>
  prismaClient.agent.findMany();

export const getAgentsByWallet = (wallet: string): Promise<Agent[]> =>
  prismaClient.agent.findMany({
    where: {
      creatorWallet: wallet,
    },
  });

export const getActiveAgentsByWallet = (wallet: string): Promise<Agent[]> =>
  prismaClient.agent.findMany({
    where: {
      creatorWallet: wallet,
      active: true,
    },
  });

export const updateAgent = async (
  agentId: string,
  updateData: Partial<Agent>,
): Promise<Agent | null> => {
  try {
    const agent = await prismaClient.agent.update({
      where: {
        id: agentId,
      },
      data: {
        ...updateData,
        terms: updateData.terms as Prisma.InputJsonValue,
      },
    });
    return agent;
  } catch (error) {
    console.error('Error updating agent:', error);
    return null;
  }
};

export const getAgentById = (id: string): Promise<Agent | null> =>
  prismaClient.agent.findUnique({
    where: {
      id,
    },
  });
