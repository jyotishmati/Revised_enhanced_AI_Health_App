import grpc
from concurrent import futures
from chat.chatModel222 import ModelResponse
import time
import ai_service_pb2
import ai_service_pb2_grpc
import health_pb2
import health_pb2_grpc
import api_pb2
import api_pb2_grpc
import cv2
import numpy as np
import PyPDF2
from PIL import Image
import PyPDF2
import numpy as np
import io
import os
from datetime import datetime


class AIService(api_pb2_grpc.AIServiceServicer):
    def GetAIResponse(self, request, context):
        question = request.question
        answer = ModelResponse(question)
        return api_pb2.AIResponse(answer=answer)
    
class FileProcessingService(health_pb2_grpc.FileProcessingServiceServicer):
    def ProcessFile(self, request, context):
        try:
            # Validate input
            if not request.file:
                context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                context.set_details("File content is empty")
                return health_pb2.FileResponse()
            
            file_type = request.type.lower()
            if file_type not in ["image", "pdf"]:
                context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                context.set_details("Invalid file type. Only 'image' or 'pdf' allowed")
                return health_pb2.FileResponse()
            
            # Process based on file type
            tests = []
            
            if file_type == "image":
                try:
                    image = Image.open(io.BytesIO(request.file))
                    tests.append(health_pb2.Test(
                        categories="ImageAnalysis",
                        parameters={
                            "width": float(image.width),
                            "height": float(image.height),
                            "format": image.format,
                            "mode": image.mode
                        }
                    ))
                except Exception as e:
                    context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                    context.set_details(f"Invalid image file: {str(e)}")
                    return health_pb2.FileResponse()
                    
            elif file_type == "pdf":
                try:
                    # timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    # filename = f"document_{timestamp}.pdf"
                    # saved_file_path = os.path.join("./", filename)
                    
                    # with open(saved_file_path, "wb") as f:
                    #     f.write(request.file)
                    pdf = PyPDF2.PdfReader(io.BytesIO(request.file))
                    tests.append(health_pb2.Test(
                        categories="PDFAnalysis",
                        parameters={
                            "pages": float(len(pdf.pages)),
                            "encrypted": float(pdf.is_encrypted)
                        }
                    ))
                except Exception as e:
                    context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                    context.set_details(f"Invalid PDF file: {str(e)}")
                    return health_pb2.FileResponse()
            
            return health_pb2.FileResponse(
                status="Success",
                message="File processed successfully",
                tests=tests
            )
            
        except Exception as e:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Server error: {str(e)}")
            return health_pb2.FileResponse()

def serve():
    # server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    # server.add_insecure_port('[::]:50051')
    # server.start()
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ai_service_pb2_grpc.add_AIServiceServicer_to_server(AIService(), server)
    ai_service_pb2_grpc.add_FileProcessingServiceServicer_to_server(FileProcessingService(), server)
    health_pb2_grpc.add_FileProcessingServiceServicer_to_server(
        FileProcessingService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server running on port 50051")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    serve()
