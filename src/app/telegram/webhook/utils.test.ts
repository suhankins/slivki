import { handleListener, handleNotListener } from './utils';
import { DocumentType } from '@typegoose/typegoose';
import { ListenerClass, ListenerModel } from '@/models/Listener';
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

vi.mock('@/models/Listener', async () => {
    return {
        ListenerModel: {
            create: vi.fn(),
        },
    };
});

describe('telegram/webhook/utils', () => {
    const spyCallApi = vi.spyOn(telegramApi, 'callApi');
    const message: telegramApi.TelegramMessage = {
        chat: {
            id: 123,
            type: 'private' as const,
        },
    };

    describe('handleListener', () => {
        const listener = mock<DocumentType<ListenerClass>>({
            telegramId: '123',
            delete: vi.fn(),
        });
        const spyListenerDelete = vi.spyOn(listener, 'delete');

        it("should not call delete or callApi if message doesn't contain text", async () => {
            message.text = undefined;
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
        it('should not throw an error if message is unsubscribe and delete failed', async () => {
            message.text = 'unsubscribe';
            spyListenerDelete.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error unsubscribing: Error: Test error',
            });
        });
        it('should not throw an error if message is unsubscribe and delete failed and callApi failed', async () => {
            message.text = 'unsubscribe';
            spyListenerDelete.mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            spyCallApi.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error unsubscribing: Error: Test error',
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
        it('should not throw an error if message is not unsubscribe and callApi failed', async () => {
            message.text = 'not unsubscribe';
            spyCallApi.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You are already subscribed',
            });
        });
    });

    describe('handleNotListener', () => {
        vi.stubEnv('TELEGRAM_PASSWORD', 'correct_password');

        it('should send a message if message is not correct password', async () => {
            message.text = 'wrong password';
            await handleNotListener(message);

            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Wrong password',
            });
        });
        it('should not throw an error if message is not correct password and callApi failed', async () => {
            message.text = 'wrong password';
            spyCallApi.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Wrong password',
            });
        });
        it('should send a message and create a listener if message is correct password', async () => {
            message.text = 'correct_password';
            const spyListenerCreate = vi.spyOn(ListenerModel, 'create');
            await handleNotListener(message);

            expect(spyCallApi).toHaveBeenCalled();
            expect(spyListenerCreate).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
        });
        it('should not throw an error if message is correct password and callApi failed', async () => {
            message.text = 'correct_password';
            spyCallApi.mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            const spyListenerCreate = vi.spyOn(ListenerModel, 'create');

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(spyListenerCreate).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
        });
        it('should not throw an error if message is correct password and create failed', async () => {
            message.text = 'correct_password';
            const spyListenerCreate = vi.spyOn(ListenerModel, 'create');
            spyListenerCreate.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(spyListenerCreate).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error subscribing: Error: Test error',
            });
        });
        it('should not throw an error if message is correct password and create failed and callApi failed', async () => {
            message.text = 'correct_password';
            const spyListenerCreate = vi.spyOn(ListenerModel, 'create');
            spyListenerCreate.mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            spyCallApi.mockImplementation(() => {
                throw new Error('Test error');
            });

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(spyListenerCreate).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
            expect(spyCallApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error subscribing: Error: Test error',
            });
        });
    });
});
