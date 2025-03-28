import grpc
from concurrent import futures
from chat.chatModel222 import ModelResponse
import time

import ai_service_pb2
import ai_service_pb2_grpc

class AIService(ai_service_pb2_grpc.AIServiceServicer):
    def GetAIResponse(self, request, context):
        question = request.question
        answer = ModelResponse(question)
        return ai_service_pb2.AIResponse(answer=answer)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ai_service_pb2_grpc.add_AIServiceServicer_to_server(AIService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Python gRPC server running on port 50051")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()
