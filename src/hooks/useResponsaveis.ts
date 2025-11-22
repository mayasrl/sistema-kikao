import { useState, useEffect, useCallback } from 'react';
import { IResponsavel, IResponsavelFormData } from '@/types';
import { responsavelService } from '@/services/mock';

export const useResponsaveis = () => {
  const [responsaveis, setResponsaveis] = useState<IResponsavel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponsaveis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await responsavelService.getAll();
      setResponsaveis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar responsáveis');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getResponsavel = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await responsavelService.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar responsável');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createResponsavel = useCallback(async (data: IResponsavelFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const novoResponsavel = await responsavelService.create(data);
      setResponsaveis(prev => [...prev, novoResponsavel]);
      return novoResponsavel;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar responsável');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateResponsavel = useCallback(async (id: string, data: Partial<IResponsavelFormData>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const responsavelAtualizado = await responsavelService.update(id, data);
      setResponsaveis(prev =>
        prev.map(r => (r.id === id ? responsavelAtualizado : r))
      );
      return responsavelAtualizado;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar responsável');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteResponsavel = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await responsavelService.delete(id);
      setResponsaveis(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir responsável');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchResponsaveis = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await responsavelService.search(query);
      setResponsaveis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar responsáveis');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResponsaveis();
  }, [fetchResponsaveis]);

  return {
    responsaveis,
    isLoading,
    error,
    fetchResponsaveis,
    getResponsavel,
    createResponsavel,
    updateResponsavel,
    deleteResponsavel,
    searchResponsaveis,
  };
};
