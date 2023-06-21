import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const PATCH = async (request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  /**
   * upsert: if you find it use the update key,
   * if you don't create a new one with data key.
   *
   * In case there are entries without analysis found.
   */

  const analysis = await analyze(updatedEntry.content);
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  // await prisma.analysis.update({
  //   where: {
  //     entryId: updatedEntry.id,
  //   },
  //   data: {
  //     ...(await analyze(updatedEntry.content)),
  //   },
  // });

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};
