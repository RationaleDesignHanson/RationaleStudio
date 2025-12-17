/**
 * Firestore React Hooks
 * Custom hooks for real-time Firestore data fetching
 */

import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase-tracker';
import { logger } from '@/lib/utils/logger';
import type {
  UnifiedProject,
  Checkpoint,
  AgentOpinion,
  Week,
} from '@/lib/types/tracker';

// Collection names
export const Collections = {
  PROJECTS: 'projects',
  CHECKPOINTS: 'checkpoints',
  AGENT_OPINIONS: 'agent_opinions',
  WEEKS: 'weeks',
};

/**
 * Hook to fetch projects with real-time updates
 */
export function useProjects() {
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, Collections.PROJECTS),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id as any,
            ...docData,
            createdAt: docData.createdAt?.toDate() || new Date(),
            updatedAt: docData.updatedAt?.toDate() || new Date(),
            team: docData.team?.map((member: any) => ({
              ...member,
              joinDate: member.joinDate?.toDate() || new Date(),
            })) || [],
          } as UnifiedProject;
        });
        setProjects(data);
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching projects:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { projects, loading, error };
}

/**
 * Hook to fetch a single project with real-time updates
 */
export function useProject(projectId: string | null) {
  const [project, setProject] = useState<UnifiedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, Collections.PROJECTS, projectId),
      (snapshot) => {
        if (snapshot.exists()) {
          const docData = snapshot.data();
          setProject({
            id: snapshot.id as any,
            ...docData,
            createdAt: docData.createdAt?.toDate() || new Date(),
            updatedAt: docData.updatedAt?.toDate() || new Date(),
            team: docData.team?.map((member: any) => ({
              ...member,
              joinDate: member.joinDate?.toDate() || new Date(),
            })) || [],
          } as UnifiedProject);
        } else {
          setProject(null);
        }
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching project:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { project, loading, error };
}

/**
 * Hook to fetch checkpoints for a project with real-time updates
 */
export function useCheckpoints(projectId: string | null, limitCount = 10) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, Collections.CHECKPOINTS),
      where('projectId', '==', projectId),
      orderBy('weekNumber', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            evaluatedAt: docData.evaluatedAt?.toDate(),
          } as Checkpoint;
        });
        setCheckpoints(data);
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching checkpoints:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId, limitCount]);

  return { checkpoints, loading, error };
}

/**
 * Hook to fetch a single checkpoint with real-time updates
 */
export function useCheckpoint(checkpointId: string | null) {
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!checkpointId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, Collections.CHECKPOINTS, checkpointId),
      (snapshot) => {
        if (snapshot.exists()) {
          const docData = snapshot.data();
          setCheckpoint({
            id: snapshot.id,
            ...docData,
            evaluatedAt: docData.evaluatedAt?.toDate(),
          } as Checkpoint);
        } else {
          setCheckpoint(null);
        }
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching checkpoint:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [checkpointId]);

  return { checkpoint, loading, error };
}

/**
 * Hook to fetch agent opinions for a checkpoint with real-time updates
 */
export function useAgentOpinions(checkpointId: string | null) {
  const [opinions, setOpinions] = useState<AgentOpinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!checkpointId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, Collections.AGENT_OPINIONS),
      where('checkpointId', '==', checkpointId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            ...docData,
            timestamp: docData.timestamp?.toDate() || new Date(),
          } as AgentOpinion;
        });
        setOpinions(data);
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching agent opinions:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [checkpointId]);

  return { opinions, loading, error };
}

/**
 * Hook to fetch all weeks for a project with real-time updates
 */
export function useWeeks(projectId: string | null) {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, Collections.WEEKS),
      where('projectId', '==', projectId),
      orderBy('weekNumber', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            ...docData,
            startDate: docData.startDate?.toDate() || new Date(),
            endDate: docData.endDate?.toDate() || new Date(),
          } as Week;
        });
        setWeeks(data);
        setLoading(false);
      },
      (err) => {
        logger.error('Error fetching weeks:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { weeks, loading, error };
}
