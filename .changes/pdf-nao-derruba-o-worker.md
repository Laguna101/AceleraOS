---
impacto: nada_mudou
secao: corrigido
titulo: Um PDF recebido no WhatsApp não derruba mais o agente
---
Um PDF de poucos KB recebido no WhatsApp reiniciava o processo do agente de IA a cada poucos segundos (estouro de memória ao ler o arquivo), e enquanto isso nenhuma conversa era respondida — o mesmo PDF voltava à fila e derrubava de novo, sem limite. Agora a leitura de PDF roda num processo à parte, com teto de memória próprio: um arquivo que não dá para ler vira um erro comum daquela mensagem, o agente segue respondendo, e depois de cinco tentativas a Central de Avisos recebe o aviso. Vale também para qualquer outro processamento que derrube o processo no meio: ele passa a contar como tentativa em vez de voltar à fila para sempre.
