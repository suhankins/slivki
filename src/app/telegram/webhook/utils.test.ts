import { handleListener } from './utils';
import { DocumentType } from '@typegoose/typegoose';
import { ListenerClass } from '@/models/Listener';
import { mock } from 'vitest-mock-extended';
import * as telegramApi from '@/lib/telegramApi';

vi.mock('@typegoose/typegoose', async () => {
    const actual = (await vi.importActual('@typegoose/typegoose')) as Object;
    return {
        ...actual,
        getModelForClass: vi.fn(),
    };
});

vi.mock('@/lib/telegramApi', async () => {
    const actual = (await vi.importActual('@/lib/telegramApi')) as Object;
    return {
        ...actual,
        callApi: vi.fn(),
    };
});

describe('telegram/webhook/utils', () => {
    describe('handleListener', () => {
        const listener = mock<DocumentType<ListenerClass>>({
            telegramId: '123',
            delete: vi.fn(),
        });
        const message: telegramApi.TelegramMessage = {
            chat: {
                id: 123,
                type: 'private' as const,
            },
        };
        const spyListenerDelete = vi.spyOn(listener, 'delete');
        const spyCallApi = vi.spyOn(telegramApi, 'callApi');

        it("should not call delete or callApi if message doesn't contain text", async () => {
            await handleListener(message, listener);

            expect(spyCallApi).not.toHaveBeenCalled();
            expect(spyListenerDelete).not.toHaveBeenCalled();
        });
        it('should delete listener and send a message if message is unsubscribe', async () => {
            message.text = 'unsubscribe';
            await handleListener(message, listener);

            expect(spyListenerDelete).toHaveBeenCalled();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
        });
        it('should delete listener and send a message if message is "uNsUbScRiBe ", ignoring case and whitespace', async () => {
            message.text = 'uNsUbScRiBe ';
            await handleListener(message, listener);

            expect(spyListenerDelete).toHaveBeenCalled();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
        });
        it('should send a message if message is not unsubscribe', async () => {
            message.text = 'not unsubscribe';
            await handleListener(message, listener);

            expect(spyListenerDelete).not.toHaveBeenCalled();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You are already subscribed',
            });
        });
    });
});
